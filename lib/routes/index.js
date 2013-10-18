// Portfolio page
var numscale = require('numscale'),
    projects = require('../projects');
exports.projects = function (req, res) {
  res.locals.page = 'projects';
  res.render('projects', projects);
};

// Contact route
exports.contact = require('./contact');

// Kaleido page
var yaml = require('js-yaml');
exports.kaleido = function (req, res) {
  var urls = require('../test/perceptual-tests/urls');
  res.render('kaleido', {layout: false, urls: urls});
};

// Render a LICENSE page
var fs = require('fs'),
    license = fs.readFileSync(__dirname + '/../../LICENSE-MIT', 'utf8');
exports.license = function (req, res) {
  res.render('license', {page: 'license', license: license});
};

// Render a health page
var pkg = require('../../package.json'),
    pkgVersion = pkg.version;
exports.health = function (req, res) {
  var retObj = {
        'version': pkgVersion,
        'uptime': process.uptime(),
        'memory': process.memoryUsage(),
        'pid': process.pid
      };
  res.send(retObj);
};
