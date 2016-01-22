// Load in the dependencies
var fs = require('fs');
var async = require('async');
var Backbone = require('backbone');
var ScriptProject = require('./script-project');

// Define common collections
var ProjectCollection = Backbone.Collection.extend({
  initialize: function (models, options) {
    Backbone.Collection.prototype.initialize.call(this, models);
    this.filepath = options.filepath;
  },
  save: function (cb) {
    fs.writeFile(this.filepath, JSON.stringify(this.toJSON(), null, 2), cb);
  },
  update: function (done) {
    async.forEach(this.models, function updateProject (project, cb) {
      project.update(cb);
    }, done);
  }
});
var ScriptCollection = ProjectCollection.extend({
  model: ScriptProject
});

// Create models for each type
var contributionsJson = require('./contributions');
var contributionModels = contributionsJson.map(function (contributionJson) {
  return new ScriptProject(contributionJson);
});
var scriptsJson = require('./scripts');
var scriptModels = scriptsJson.map(function (scriptJson) {
  return new ScriptProject(scriptJson);
});

// Generate and return collections for each project type
exports.contributions = new ScriptCollection(contributionModels, {
  filepath: __dirname + '/contributions.json'
});
exports.scripts = new ScriptCollection(scriptModels, {
  filepath: __dirname + '/scripts.json'
});

exports.update = function (done) {
  async.parallel([
    function updateContributions (cb) {
      exports.contributions.update(cb);
    },
    function updateScripts (cb) {
      exports.scripts.update(cb);
    }
  ], done);
};
exports.save = function (done) {
  async.parallel([
    function saveContributions (cb) {
      exports.contributions.save(cb);
    },
    function saveScripts (cb) {
      exports.scripts.save(cb);
    }
  ], done);
};

exports.toJSON = function () {
  return {
    contributions: this.contributions.toJSON(),
    scripts: this.scripts.toJSON()
  };
};
