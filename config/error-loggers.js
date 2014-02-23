// Load in dependencies
var util = require('util');
var rollbar = require('rollbar');
var rollbarConfig = require('./secret').rollbar;

// Define our error loggers
exports.common = function (params) {
  return function consoleRollbar (err, req) {
    console.error('[error-logger]: ', req.method, req.url, err);
  };
};

exports.production = function (params) {
  rollbar.init(rollbarConfig.serverToken, params);
  return function consoleRollbar (err, req) {
    rollbar.handleError(err, req);
  };
};
