// Create the server
var express = require('express');
var config = require('../config');
var routes = require('./routes');

function Server() {
  this.app = express();
  this.registerViewEngine();
  this.addRoutes();
}
Server.prototype = {
  registerViewEngine: function () {
    // Set up view engine and static files for pages
    var app = this.app;
    app.engine('ejs', require('consolidate').ejs);
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/../views');
    app.use('/public', express['static'](__dirname + '/../dist'));
    app.use('/public', express['static'](__dirname + '/../public'));

    // Host /test for kaleidoscope
    // TODO: Make this host test routes
    if (config.inDevelopment) {
      app.use('/test', express['static'](__dirname + '/../test'));
    }

    app.use(require('express-partials')());
  },
  addRoutes: function () {
    // Localize app
    var app = this.app;

    // If we are in development, check for a grid flag
    // TODO: Make this addGridMiddleware
    if (config.inDevelopment) {
      app.all('*', function (req, res, next) {
        // If there is a grid param, save it
        res.locals.enableGrid = req.query.grid !== undefined;

        // Continue
        next();
      });
    }

    // TODO: Move projects into config
    app.locals.numscale = require('numscale').scale;
    app.locals.projects = require('./projects');

    // Bind routes
    app.use(routes.common);
  },
  listen: function (port) {
    this.app.listen(port);
  }
};

// Begin listening for requests
var server = new Server();
server.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');