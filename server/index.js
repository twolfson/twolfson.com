// Load in dependencies
var _ = require('underscore');
var express = require('express');
var routes = require('./routes');

// Define a server constructor
function Server(config) {
  // Create an app and save config for bindings/later
  this.app = express();
  this.config = config;

  // Register common items
  this.registerViewEngine();
  this.addRoutes();
}
Server.prototype = {
  registerViewEngine: function () {
    // Set up view engine and static files for pages
    var app = this.app;
    app.engine('ejs', require('consolidate').ejs);
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use('/public', express['static'](__dirname + '/../dist'));
    app.use('/public', express['static'](__dirname + '/../public'));
    app.use(require('express-partials')());
  },
  addRoutes: function () {
    // Localize app and config
    var app = this.app;
    var config = this.config;

    // Extend app.locals with config's app.locals
    _.extend(app.locals, config['app.locals']);

    // Add test and development specific routes
    if (config.addDevelopmentRoutes) {
      // Host /test for kaleidoscope
      app.use('/test', express['static'](__dirname + '/../test'));
      app.use(routes.development(config));
    }
    if (config.addTestRoutes) {
      app.use(routes.test(config));
    }

    // Bind routes
    app.use(routes.common(config));

    // TODO: Integrate Travis CI to local testing (with notifications)
    // TODO: Add error handler here
  },
  listen: function () {
    this._app = this.app.listen(this.config.url.internal.port);
  },
  destroy: function (cb) {
    this._app.close(cb || function noop () {});
  }
};

// Export the server
module.exports = Server;
