// Load in the dependencies
var fs = require('fs');
var Backbone = require('backbone');
var competitionsJson = require('./competitions');
var CompetitionProject = require('./competition-project');
var contributionsJson = require('./contributions');
var scriptsJson = require('./scripts');
var ScriptProject = require('./script-project');

// Define common collections
var CompetitionCollection = Backbone.Collection.extend({
  model: CompetitionProject
});
var ScriptCollection = Backbone.Collection.extend({
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
module.exports = {
  competitions: new CompetitionCollection(competitionModels, {
    filepath: __dirname + '/competitions.json'
  }),
  contributions: new ScriptCollection(contributionModels, {
    filepath: __dirname + '/contributions.json'
  }),
  scripts: new ScriptCollection(scriptModels, {
    filepath: __dirname + '/scripts.json'
  }),
  update: function () {
    // TODO: Invoke async.parallel + update on all projects
  },
  save: function () {
    // TODO: Save each toJSON format to disk
  },
  toJSON: function () {
    return {
      competitions: this.competitions.toJSON(),
      contributions: this.contributions.toJSON(),
      scripts: this.scripts.toJSON()
    };
  }
};
