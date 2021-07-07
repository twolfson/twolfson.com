// Load in dependencies
var express = require('express');
var controllers = require('./controllers');
var getJojo = require('../articles').getJojo;

// Define common routes
exports.common = function (config) {
  // Generate a router
  var router = new express.Router();

  // Check for a grid flag
  router.all('*', function (req, res, next) {
    // If there is a grid param, save it
    res.locals.enableGrid = req.query.grid !== undefined;
    next();
  });

  // Override our article URLs
  var articles = config.articles;
  articles.forEach(function updateArticleUrl(article) {
    article.url = article.urlOverride || article.url;
  });

  // Blog
  // TODO: Move these onto config with a required parameter of `articles/article`
  // TODO: Namespce articles with /articles or /blog, set up redirects for all previously existing routes
  // TODO: Should we also redirect / to /articles or /blog?
  router.get('/', controllers.blog.index({articles: articles}));
  articles.forEach(function (article) {
    var url = article.url;

    // Build our cached article endpoint
    var articleFn = controllers.blog.article({article: article});

    // If we're in development, reload our articles and server those
    if (true) {
      articleFn = function (req, res, next) {

      }
    }
    router.get(url, );
    }

    // If there are any alternate URLs, redirect them
    if (article.alternateUrls) {
      article.alternateUrls.forEach(function handleAlternateUrl(alternateUrl) {
        router.get(alternateUrl, function redirectToArticle(req, res, next) {
          res.redirect(301, url);
        });
      });
    }
  });
  router.get('/index.xml', controllers.blog.rss({articles: articles}));

  // Projects pages
  router.get('/projects', controllers.projects(config));

  // Contact pages
  router.get('/contact', controllers.contact.index(config));

  // Support me
  router.get('/support-me', controllers['support-me'](config));

  // License and health
  router.get('/license', controllers.license(config));
  router.get('/health', controllers.health(config));

  // Error generators
  router.get('/errors/assertion', controllers['error-generators'].assertion(config));

  // Handle missing pages and errors in controllers
  router.all('*', controllers['error-handlers'].missingPage(config));
  router.all('*', controllers['error-handlers'].errorEncountered(config));

  // router.middleware has signature of `function (req, res, next) {}`
  return router.middleware;
};

exports.development = function (config) {
  var router = new express.Router();

  // Add a kaleidoscope test page
  router.get('/kaleido', controllers.kaleido(config));

  return router.middleware;
};

exports.test = function (config) {
  var router = new express.Router();

  // Host 500 page for screenshotting
  router.get('/500', controllers['error-handlers'][500]);

  return router.middleware;
};
