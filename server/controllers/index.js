// Load in dependencies
var fs = require('fs');

// Load in controller groups
exports.blog = require('./blog');
exports.contact = require('./contact');
exports['error-generators'] = require('./error-generators');
exports['error-handlers'] = require('./error-handlers');
exports['support-me'] = require('./support-me');

// Portfolio page
exports.projects = function (config) {
  // TODO: Re-enabling project auto-updating
  //   // Every hour, update the stats
  // // console.log('*** WARNING: OFFLINE FETCH IS DISABLED ***');
  // var second = 1000,
  //     everyHour = second * 60 * 60;
  // setInterval(updateStats, everyHour);
  var projects = require('../models/projects');
  if (config.updateProjectsImmediately) {
    process.nextTick(global.updateProjects);
  }
  return [
    function projectsFn (req, res) {
      res.render('projects', {
        page: 'projects',
        title: 'Todd Wolfson - Projects',
        // TODO: I really dislike view configuration being placed in the route
        navMargin: false,
        seoKeywords: 'dev tools, web tools, spritesmith, sexy-bash-prompt, File Watcher, jsmin-sourcemap, Find++',
        seoDescription: 'Projects by Todd Wolfson: spritesmith, sexy-bash-prompt, File Watcher, jsmin-sourcemap, Find++',
        projects: projects
      });
    }
  ];
};

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
exports.health = function (config) {
  var pkgVersion = config['package'].version;
  return [
    function healthFn (req, res) {
      var retObj = {
        'version': pkgVersion,
        'uptime': process.uptime(),
        'memory': process.memoryUsage(),
        'pid': process.pid,
        'env': config.ENV
      };
      res.send(retObj);
    }
  ];
};
