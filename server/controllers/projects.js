var projects = require('../models/projects');

module.exports = function (config) {
  var stringifiedProjects = projects.toJSON();

  // TODO: Should we do this elsewhere? It does not belong in a controller which can be reloaded again and again
  // If we should update the projects immediately, do so
  if (config.projectOptions.updateImmediately) {
    projects.update(function handleUpdate(err) {
      // If there was an error, log it
      if (err) {
        return config.errorHandler(err);
      }

      // Otherwise, update stringified projects
      stringifiedProjects = projects.toJSON();
    });
  }

  // If we have an update interval, update the `stringifiedProjects` every interval
  var updateInterval = config.projectOptions.updateInterval;
  if (updateInterval) {
    // eslint-disable-next-line callback-return
    setInterval(function updateProjectsInterval() {
      projects.update(function handleUpdate(err) {
        // If there was an error, log it
        if (err) {
          return config.errorHandler(err);
        }

        // Otherwise, update stringified projects
        stringifiedProjects = projects.toJSON();
      });
    }, updateInterval);
  }

  return [
    function projectsFn(req, res) {
      res.render('projects.jade', {
        projects: stringifiedProjects
      });
    }
  ];
};
