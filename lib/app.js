// Create the server
var express = require('express'),
    config = require('../config');

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
    if (config.inDevelopment) {
      app.use('/test', express['static'](__dirname + '/../test'));
    }

    app.use(require('express-partials')());
  },
  getArticles: function () {
    if (!this.articles) {
      // Load in dependencies
      var marked = require('marked'),
          moment = require('moment'),
          jojo = require('jojo');

      // Create a jojo middleware (and only use it to get articles from)
      var articles = jojo({
        formatter: function (code) {
          return marked.parse(code, {langPrefix: ''});
        },
        render: false,
        author: 'Todd Wolfson',
        title: 'Todd Wolfson - Javascript Developer',
        url: 'http://twolfson.com/'
      }).articles;

      // Add a formatted date for each article
      articles.forEach(function (article) {
        var date = article.date,
            dateStr = moment(date).format('MMMM DD, YYYY');
        article.dateStr = dateStr;
      });

      // Save this.articles for later
      this.articles = articles;
    }
    return this.articles;
  },
  addRoutes: function () {
    // Localize app
    var app = this.app;

    // Configure routes
    var routes = require('./routes');
    app.locals.config = {};

    // Blog
    var articles = this.getArticles();
    app.get('/', routes.blog.index({articles: articles}));
    articles.forEach(function (article) {
      // DEV: Escape '+' as express coerces URL to a regexp
      var url = article.url.replace(/\+/g, '\\+');
      app.get(url, routes.blog.article({article: article}));
    });
    app.get('/index.xml', routes.blog.rss);

    // Projects pages
    app.locals.numscale = require('numscale').scale;
    app.locals.projects = require('./projects');
    app.get('/projects', routes.projects);

    // Contact pages
    app.get('/contact', routes.contact.index);
    if (config.inDevelopment) {
      app.get('/contact/failure', routes.contact.devFailure);
      app.get('/contact/success', routes.contact.devSuccess);
    }
    app.post('/contact', express.bodyParser(), routes.contact.submit);

    // If we are in development, add a kaleidoscope test page
    if (config.inDevelopment) {
      app.get('/kaleido', routes.kaleido);
    }

    // License and health
    app.get('/license', routes.license);
    app.get('/health', routes.health);

    // If the page is not found, throw an error and redirect to the 404 page
    app.all('*', function (req, res) {
      res.status(404);
      res.render('404', {'page': '404'});
    });
  },
  listen: function (port) {
    this.app.listen(port);
  }
};

// Begin listening for requests
var server = new Server();
server.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');