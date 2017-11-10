var projects = require('../server/models/projects');
projects.update(function (err) {
  // If there was an error, throw it
  if (err) {
    throw err;
  }

  // Otherwise, sort each collection (by stars then forks)
  function sortProjects(a, b) {
    var aStars = a.get('stars');
    var bStars = b.get('stars');
    if (aStars < bStars) { return 1; }
    if (aStars > bStars) { return -1; }

    var aForks = a.get('forks');
    var bForks = b.get('forks');
    if (aForks < bForks) { return 1; }
    if (aForks > bForks) { return -1; }

    var aName = a.get('name');
    var bName = b.get('name');
    if (aName > bName) { return 1; }
    if (aName < bName) { return -1; }
    return 0;
  }
  projects.contributions.comparator = sortProjects;
  projects.scripts.comparator = sortProjects;
  projects.contributions.sort();
  projects.scripts.sort();

  // Save the projects to disk
  projects.save(function (err) {
    // If there was an error, throw it
    if (err) {
      throw err;
    }

    // Otherwise, exit the program
    // eslint-disable-next-line no-console
    console.log('Projects should be updated');
    process.exit();
  });
});
