// Load in dependencies
var fs = require('fs');

// Load in controller groups
exports.blog = require('./blog');
exports.contact = require('./contact');
exports['error-generators'] = require('./error-generators');
exports['error-handlers'] = require('./error-handlers');
exports['support-me'] = require('./support-me');

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
exports.license = function (config) {
  var license = fs.readFileSync(__dirname + '/../../LICENSE-MIT', 'utf8');
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
