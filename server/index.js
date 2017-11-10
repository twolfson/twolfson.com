// Load in dependencies
var assert = require('assert');
var _ = require('underscore');
var numscale = require('numscale');
var express = require('express');
var jadeEngine = require('jade').__express;
var controllers = require('./controllers');
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
    app.engine('jade', jadeEngine);
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
    app.use('/public', express.static(__dirname + '/../dist'));
    app.use('/public', express.static(__dirname + '/../public'));
  },
  addRoutes: function () {
    // Localize app and config
    var app = this.app;
    var config = this.config;

    // Set up our app.locals
    _.extend(app.locals, {
      assert: assert,
      config: config.jojo,
      env: config.ENV,
      googleAnalyticsId: config.googleAnalyticsId,
      numscale: numscale.scale,
      sentryBrowserDSN: config.sentry.browserDSN,
      version: config.version
    });

    // Add test and development specific routes
    if (config.addDevelopmentRoutes) {
      // Host /test for kaleidoscope
      app.use('/test', express.static(__dirname + '/../test'));
      app.use(routes.development(config));
    }
    if (config.addTestRoutes) {
      app.use(routes.test(config));
    }

    // Bind routes
    app.use(routes.common(config));

    // Handle middleware errors
    app.use(controllers['error-handlers'].errorEncountered(config));
  },
  listen: function () {
    this._app = this.app.listen(this.config.url.internal.port, this.config.url.listeningHostname);
  },
  destroy: function (cb) {
    this._app.close(cb || function noop() {});
  }
};

// Export the server
module.exports = Server;
