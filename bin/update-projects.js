// TODO: Get this working...
var fs = require('fs');
var projects = require('../server/models/projects');
// updateStats(function handleStatsUpdate () {
//   // Sort the scripts and contributions by stars then forks
//   function sortRepos(a, b) {
//     var aStars = a.stars;
//     var bStars = b.stars;
//     if (aStars < bStars) { return 1; }
//     if (aStars > bStars) { return -1; }

//     var aForks = a.forks;
//     var bForks = b.forks;
//     if (aForks < bForks) { return 1; }
//     if (aForks > bForks) { return -1; }

//     var aName = a.name;
//     var bName = b.name;
//     if (aName > bName) { return 1; }
//     if (aName < bName) { return -1; }
//     return 0;
//   }
//   scripts.sort(sortRepos);
//   contributions.sort(sortRepos);

//   // In a minute, save the updates to their respective JSON files
//   setTimeout(function () {
//     fs.writeFileSync(scriptsFile, JSON.stringify(scripts, null, 2), 'utf8');
//     fs.writeFileSync(competitionsFile, JSON.stringify(competitions, null, 2), 'utf8');
//     fs.writeFileSync(contributionsFile, JSON.stringify(contributions, null, 2), 'utf8');

//     // Exit the program
//     console.log('Projects should be updated');
//     process.exit();
//   }, 2000);
// });
