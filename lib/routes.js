// Load in dependencies
var fs = require('fs'),
    express = require('express'),
    humanize = require('humanize'),
    config = require('../config');

// Export our app bindings
module.exports = function (app) {
  // Portfolio page
  var projects = require('./projects');
  projects.page = 'projects';
  projects.intword = humanize.intword;
  app.get('/projects', function (req, res) {
    res.render('projects', projects);
  });

  // If we are in development, add a contact/test page
  if (config.inDevelopment) {
    app.get('/contact', function (req, res, next) {
      var query = req.query || {},
          test = query.test;

      // If there is a test query, render the proper response
      if (test) {
        var emailStatus = test !== 'fail';
        res.render('contact', {'page': 'contact', 'emailStatus': emailStatus});
      } else {
      // Otherwise, continue
        next();
      }
    });
  }

  // Contact page (initial view)
  app.get('/contact', function (req, res) {
    res.render('contact', {'page': 'contact'});
  });

  // Set up email server interaction
  var email = require('emailjs'),
      emailConf = require('../mail.conf'),
      emailServer = email.server.connect(emailConf);

  // Contact page (submission)
  app.post('/contact', express.bodyParser());
  app.post('/contact', function (req, res, next) {
    // Parse the body
    var info = {'page': 'contact'},
        body = req.body,
        message = "";

    // Compose the text message
    message += "Name: " + body.name + "\n";
    message += "Info: " + body.info + "\n";
    message += "Message: " + body.message + "";

    // Send a message to todd
    emailServer.send({
      'text': message,
      'from': 'No Reply <no-reply@twolfson.com>',
      'to': 'Todd Wolfson <todd@twolfson.com>',
      'subject': 'Incoming query from twolfson.com'
    }, function (err, message) {
      info.emailStatus = !err;
      res.render('contact', info);
    });
  });

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

  // If the page is not found, throw an error and redirect to the 404 page
  app.all('*', function (req, res) {
    res.render('404', {'status': 404, 'page': '404'});
  });
};