// Load in the dependencies
var fs = require('fs');
var async = require('async');
var Backbone = require('backbone');
// TODO: Load these on initialize?
var competitionsJson = require('./competitions');
var CompetitionProject = require('./competition-project');
var contributionsJson = require('./contributions');
var scriptsJson = require('./scripts');
var ScriptProject = require('./script-project');

// Define common collections
var ProjectCollection = Backbone.Collection.extend({
  initialize: function (models, options) {
    Backbone.Collection.prototype.initialize.call(this, models);
    this.filepath = options.filepath;
  },
  save: function (cb) {
    fs.writeFile(this.filepath, this.toJSON(), cb);
  }
});
var CompetitionCollection = ProjectCollection.extend({
  model: CompetitionProject
});
var ScriptCollection = ProjectCollection.extend({
  model: ScriptProject
});

// Create models for each type
var competitionModels = competitionsJson.map(function (competitionJson) {
  return new CompetitionProject(competitionJson);
});
var contributionModels = contributionsJson.map(function (contributionJson) {
  return new ScriptProject(contributionJson);
});
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

exports.update  = function (cb) {
  // TODO: Invoke async.parallel + update on all projects
  process.nextTick(cb);
};
exports.save = function (done) {
  // TODO: Save each toJSON format to disk
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
