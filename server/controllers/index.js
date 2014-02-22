// Blog routes
exports.blog = require('./blog');
exports['support-me'] = require('./support-me');

// Portfolio page
exports.projects = function (config) {
  return [
    function projectsFn (req, res) {
      res.render('projects', {
        page: 'projects',
        title: 'Todd Wolfson - Projects',
        // TODO: I really dislike view configuration being placed in the route
        navMargin: false,
        seoKeywords: 'dev tools, web tools, spritesmith, sexy-bash-prompt, File Watcher, jsmin-sourcemap, Find++',
        seoDescription: 'Projects by Todd Wolfson: spritesmith, sexy-bash-prompt, File Watcher, jsmin-sourcemap, Find++'
      });
    }
  ];
};

// Contact route
exports.contact = require('./contact');

// Kaleido page
exports.kaleido = function (config) {
  // DEV: Relocate js-yaml inside route for dev-only dependencies
  var yaml = require('js-yaml');
  var urls = require('../../test/perceptual-tests/urls');

  return [
    function kaleidoFn (req, res) {
      res.render('kaleido', {layout: false, urls: urls});
    }
  ];
};

// Render a LICENSE page
// TODO: Relocate MIT license into app.locals in config?
var fs = require('fs');
var license = fs.readFileSync(__dirname + '/../../LICENSE-MIT', 'utf8');
exports.license = function (config) {
  return [
    function licenseFn (req, res) {
      res.render('license', {
        page: 'license',
        license: license,
        title: 'Todd Wolfson - License',
        seoKeywords: 'license, mit',
        seoDescription: 'twolfson.com uses the MIT License'
      });
    }
  ];
};

// Render a health page
// TODO: Relocate package info into config
var pkg = require('../../package.json');
var pkgVersion = pkg.version;
exports.health = function (config) {
  return [
    function healthFn (req, res) {
      var retObj = {
        'version': pkgVersion,
        'uptime': process.uptime(),
        'memory': process.memoryUsage(),
        'pid': process.pid,
        'env': config.env
      };
      res.send(retObj);
    }
  ];
};

// 404 page (no SEO here)
exports['404'] = function (config) {
  return [
    function error404Fn (req, res) {
      res.status(404);
      res.render('404', {'page': '404'});
    }
  ];
};