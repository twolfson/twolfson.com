// Portfolio page
var numscale = require('numscale'),
    projects = require('../projects');
module.exports = function projectsRoute (req, res) {
  res.locals.page = 'projects';
  res.render('projects', projects);
};