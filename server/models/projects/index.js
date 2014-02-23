// Load in the dependencies
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
  competitions: new CompetitionCollection(competitionModels).toJSON(),
  contributions: new ScriptCollection(contributionModels).toJSON(),
  scripts: new ScriptCollection(scriptModels).toJSON()
};
