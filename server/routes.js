// Load in dependencies
var express = require('express');
var controllers = require('./controllers');

// Define common routes
exports.common = function () {
  // Generate a router
  var router = new express.Router();

  // Projects pages
  router.get('/projects', controllers.projects);

  // Contact pages
  router.get('/contact', controllers.contact.index);
  if (config.inDevelopment) {
    router.get('/contact/failure', controllers.contact.devFailure);
    router.get('/contact/success', controllers.contact.devSuccess);
  }
  router.post('/contact', express.urlencoded(), controllers.contact.submit);

  // If we are in development, add a kaleidoscope test page
  if (config.inDevelopment) {
    router.get('/kaleido', controllers.kaleido);
  }

  // Support me
  router.get('/support-me', controllers['support-me'](config));

  // License and health
  router.get('/license', controllers.license);
  router.get('/health', controllers.health);

  // If the page is not found, throw an error and render the 404 page
  router.all('*', controllers['404']);

  // router.middleware has signature of `function (req, res, next) {}`
  return router.middleware;
};