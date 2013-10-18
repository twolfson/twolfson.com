// Load in dependencies
var fs = require('fs'),
    express = require('express'),
    config = require('../config');

// Export our app bindings
module.exports = function (app) {
  // If we are in development, add a kaleidoscope test page
  if (config.inDevelopment) {
    var yaml = require('js-yaml');
    app.get('/kaleido', function (req, res, next) {
      var urls = require('../test/perceptual-tests/urls');
      res.render('kaleido', {layout: false, urls: urls});
    });
  }

  // Render a LICENSE page
  app.get('/license', function (req, res, next) {
    fs.readFile(__dirname + '/../LICENSE-MIT', 'utf8', function (err, license) {
      // If there was an error, continue
      if (err) {
        return next(err);
      }

      // Otherwise, render the license
      res.render('license', {page: 'license', license: license});
    });
  });

  // Expose a health page
  var pkg = require('../package'),
      pkgVersion = pkg.version;
  app.get('/health', function (req, res) {
    var retObj = {
          'version': pkgVersion,
          'uptime': process.uptime(),
          'memory': process.memoryUsage(),
          'pid': process.pid
        };
    res.send(retObj);
  });
};