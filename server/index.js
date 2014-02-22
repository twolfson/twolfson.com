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
    if (config.addTestRoutes) {
      app.use(routes.test);
    }

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

    // TODO: Relocate into a controller which is somehow more self-aware
    var controllers = require('./controllers');
    // Blog
    // TODO: Integrate Travis CI to local testing (with notifications)
    // TODO: Add test for xml rendering
    var articles = require('../articles');
    app.get('/', controllers.blog.index({articles: articles}));
    articles.forEach(function (article) {
      // DEV: Escape '+' as express coerces URL to a regexp
      var url = article.url.replace(/\+/g, '\\+');
      app.get(url, controllers.blog.article({article: article}));
    });
    app.get('/index.xml', controllers.blog.rss({articles: articles}));

    // TODO: Move projects into config
    app.locals.numscale = require('numscale').scale;
    app.locals.projects = require('./models/projects');

    // Bind routes
    app.use(routes.common(config));

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

// Begin listening for requests
// TODO: Move into `bin` script
if (require.main === module) {
  var url = require('url');
  var env = process.env.NODE_ENV || 'development';
  var settings = require('../config').getSettings({env: env});
  var server = new Server(settings);
  server.listen();
  console.log('Server running at ' + url.format(settings.url.external) + '/');
}
