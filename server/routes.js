// Load in dependencies
var express = require('express');
var controllers = require('./controllers');

// Define common routes
exports.common = function (config) {
  // Generate a router
  var router = new express.Router();

  // Projects pages
  router.get('/projects', controllers.projects(config));

  // Contact pages
  router.get('/contact', controllers.contact.index(config));
  if (config.inDevelopment) {
    router.get('/contact/failure', controllers.contact.devFailure(config));
    router.get('/contact/success', controllers.contact.devSuccess(config));
  }
  router.post('/contact', express.urlencoded(), controllers.contact.submit(config));

  // If we are in development, add a kaleidoscope test page
  if (config.inDevelopment) {
    router.get('/kaleido', controllers.kaleido(config));
  }

  // Support me
  router.get('/support-me', controllers['support-me'](config));

  // License and health
  router.get('/license', controllers.license(config));
  router.get('/health', controllers.health(config));

  // If the page is not found, throw an error and render the 404 page
  router.all('*', controllers['404'](config));
  // TODO: Add error handler here

  // router.middleware has signature of `function (req, res, next) {}`
  return router.middleware;
};

exports.test = function (config) {
  var router = new express.Router();

  // Host /test for kaleidoscope
  app.use('/test', express['static'](__dirname + '/../test'));

  return router.middleware;
};
