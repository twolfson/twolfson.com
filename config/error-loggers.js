// Load in dependencies
var util = require('util');
var rollbar = require('rollbar');
var rollbarConfig = require('./secret').rollbar;

// Define our error loggers
exports.console = function (params) {
  return function consoleLogger (err, req) {
    console.error('[error-logger]: ', req.method, req.url, err);
  };
};

exports.cache = function (params) {
  return function cacheLogger (err, req) {
    params.errors.push({
      err: err,
      req: req
    });
  };
};

exports.rollbar = function (params) {
  rollbar.init(rollbarConfig.serverToken, params);
  return function rollbarLogger (err, req) {
    rollbar.handleError(err, req);
  };
};
