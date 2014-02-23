module.exports = function (config) {
  var projects = require('../models/projects');
  var stringifiedProjects = {
    competitions: projects.competitions.toJSON(),
    contributions: projects.contributions.toJSON(),
    scripts: projects.scripts.toJSON()
  };
  return [
    function projectsFn (req, res) {
      res.render('projects', {
        page: 'projects',
        title: 'Todd Wolfson - Projects',
        // TODO: I really dislike view configuration being placed in the route
        navMargin: false,
        seoKeywords: 'dev tools, web tools, spritesmith, sexy-bash-prompt, File Watcher, jsmin-sourcemap, Find++',
        seoDescription: 'Projects by Todd Wolfson: spritesmith, sexy-bash-prompt, File Watcher, jsmin-sourcemap, Find++',
        projects: stringifiedProjects
      });
    }
  ];
};
