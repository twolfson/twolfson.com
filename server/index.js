// Create the server
var express = require('express');
var CONFIG = require('../config');
var routes = require('./routes');

function Server(/* CONFIG */) {
  // Create an app and save config for bindings/later
  this.app = express();
  this.config = CONFIG;

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

    // Host /test for kaleidoscope
    // TODO: Move this into test route bindings
    if (this.config.inDevelopment) {
      app.use('/test', express['static'](__dirname + '/../test'));
    }

    app.use(require('express-partials')());
  },
  addRoutes: function () {
    // Localize app and config
    var app = this.app;
    var config = this.config;

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
    app.use(routes.common);

    // TODO: Add error handler here
  },
  listen: function (port) {
    this.app.listen(port);
  }
};

// Begin listening for requests
var server = new Server();
server.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');