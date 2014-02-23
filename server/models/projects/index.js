// Set up for file references
var competitionsFile = __dirname + '/competitions.json';
var contributionsFile = __dirname + '/contributions.json';
var scriptsFile = __dirname + '/scripts.json';

// Load in all the files
var scripts = require(scriptsFile);
var competitions = require(competitionsFile);
var contributions = require(contributionsFile);

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
  competitions: competitions,
  contributions: contributions,
  scripts: scripts
};
