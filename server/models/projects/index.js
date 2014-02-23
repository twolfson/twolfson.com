// Load in the dependencies
var Backbone = require('backbone');
var competitionsJson = require('./competitions');
var CompetitionProject = require('./competition-project');
var contributionsJson = require('./contributions');
var scriptsJson = require('./scripts');
var ScriptProject = require('./script-project');

// Create collections for each type
var competitionModels = competitionsJson.map(function (competitionJson) {
  return new CompetitionProject(competitionJson);
});
var competitions = new Backbone.Collection(competitionModels, {
  model: CompetitionProject
});
var contributionModels = contributionsJson.map(function (contributionJson) {
  return new ScriptProject(contributionJson);
});
var contributions = new Backbone.Collection(contributionModels, {
  model: ScriptProject
});
var scriptModels = scriptsJson.map(function (scriptJson) {
  return new ScriptProject(scriptJson);
});
var scripts = new Backbone.Collection(scriptModels, {
  model: ScriptProject
});

function updateStats(cb) {
  // Update each of the types
  scripts.forEach(updateScript);
  competitions.forEach(updateCompetition);
  contributions.forEach(updateScript);

  // If there is a callback, run it
  if (cb) {
    cb();
  }
}
global.updateProjects = updateStats;

module.exports = {
  competitions: competitions.toJSON(),
  contributions: contributions.toJSON(),
  scripts: scripts.toJSON()
};
