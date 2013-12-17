// Blog routes
exports.blog = require('./blog');

// Portfolio page
exports.projects = function (req, res) {
  res.render('projects', {
    page: 'projects',
    title: 'Todd Wolfson - Projects',
    // TODO: I really dislike view configuration being placed in the route
    navMargin: false,
    seoKeywords: 'dev tools, web tools, spritesmith, sexy-bash-prompt, File Watcher, jsmin-sourcemap, Find++',
    seoDescription: 'Projects by Todd Wolfson: spritesmith, sexy-bash-prompt, File Watcher, jsmin-sourcemap, Find++'
  });
};

// Contact route
exports.contact = require('./contact');

// Kaleido page
exports.kaleido = function (req, res) {
  // DEV: Relocate js-yaml inside route for dev-only dependencies
  var yaml = require('js-yaml'),
      urls = require('../../test/perceptual-tests/urls');
  res.render('kaleido', {layout: false, urls: urls});
};

// Render a LICENSE page
var fs = require('fs'),
    license = fs.readFileSync(__dirname + '/../../LICENSE-MIT', 'utf8');
exports.license = function (req, res) {
  res.render('license', {
    page: 'license',
    license: license,
    title: 'Todd Wolfson - License',
    seoKeywords: 'license, mit',
    seoDescription: 'twolfson.com uses the MIT License'
  });
};

// Render a health page
var pkg = require('../../package.json'),
    pkgVersion = pkg.version,
    config = require('../../config');
exports.health = function (req, res) {
  var retObj = {
        'version': pkgVersion,
        'uptime': process.uptime(),
        'memory': process.memoryUsage(),
        'pid': process.pid,
        'env': env
      };
  res.send(retObj);
};

// 404 page (no SEO here)
exports['404'] = function (req, res) {
  res.status(404);
  res.render('404', {'page': '404'});
};