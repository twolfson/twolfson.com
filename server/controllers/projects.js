var projects = require('../models/projects');

module.exports = function (config) {
  var stringifiedProjects = projects.toJSON();

  // TODO: Should we do this elsewhere? It does not belong in a controller which can be reloaded again and again
  // If we should update the projects immediately, do so
  if (config.projectOptions.updateImmediately) {
    projects.update(function handleUpdate (err) {
      // If there was an error, log it
      if (err) {
        return config.errorLogger(err);
      }

      // Otherwise, update stringified projects
      stringifiedProjects = projects.toJSON();
    });
  }

  // If we have an update interval, update the `stringifiedProjects` every interval
  var updateInterval = config.projectOptions.updateInterval;
  if (updateInterval) {
    setInterval(function updateProjectsInterval () {
      projects.update(function handleUpdate (err) {
        // If there was an error, log it
        if (err) {
          return config.errorLogger(err);
        }

        // Otherwise, update stringified projects
        stringifiedProjects = projects.toJSON();
      });
    }, updateInterval);
  }

  return [
    function projectsFn (req, res) {
      res.render('projects.jade', {
        page: 'projects',
        title: 'Todd Wolfson - Projects',
        // TODO: I really dislike view configuration being placed in the route
        navMargin: false,
        seoKeywords: 'dev tools, web tools, spritesmith, sexy-bash-prompt, jsmin-sourcemap, ' +
          'Find++, image-diff, eight-track, gifsockets, foundry',
        seoDescription: 'Projects by Todd Wolfson: spritesmith, sexy-bash-prompt, jsmin-sourcemap, ' +
          'Find++, image-diff, eight-track, gifsockets, foundry',
        projects: stringifiedProjects
      });
    }
  ];
};
