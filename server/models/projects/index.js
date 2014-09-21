// Load in the dependencies
var fs = require('fs');
var async = require('async');
var Backbone = require('backbone');
var CompetitionProject = require('./competition-project');
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
var CompetitionCollection = ProjectCollection.extend({
  model: CompetitionProject
});
var ScriptCollection = ProjectCollection.extend({
  model: ScriptProject
});

// Create models for each type
var competitionsJson = require('./competitions');
var competitionModels = competitionsJson.map(function (competitionJson) {
  return new CompetitionProject(competitionJson);
});
var contributionsJson = require('./contributions');
var contributionModels = contributionsJson.map(function (contributionJson) {
  return new ScriptProject(contributionJson);
});
var scriptsJson = require('./scripts');
var scriptModels = scriptsJson.map(function (scriptJson) {
  return new ScriptProject(scriptJson);
});

// Generate and return collections for each project type
exports.competitions = new CompetitionCollection(competitionModels, {
  filepath: __dirname + '/competitions.json'
});
exports.contributions = new ScriptCollection(contributionModels, {
  filepath: __dirname + '/contributions.json'
});
exports.scripts = new ScriptCollection(scriptModels, {
  filepath: __dirname + '/scripts.json'
});

exports.update = function (done) {
  async.parallel([
    // function updateCompetitions (cb) {
    //   exports.competitions.update(cb);
    // },
    // function updateContributions (cb) {
    //   exports.contributions.update(cb);
    // },
    function updateScripts (cb) {
      exports.scripts.update(cb);
    }
  ], done);
};
exports.save = function (done) {
  async.parallel([
    function saveCompetitions (cb) {
      exports.competitions.save(cb);
    },
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
    competitions: this.competitions.toJSON(),
    contributions: this.contributions.toJSON(),
    scripts: this.scripts.toJSON()
  };
};
