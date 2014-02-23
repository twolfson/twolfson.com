// Load in dependencies
var rollbar = require('rollbar');
var rollbarConfig = require('./secret').rollbar;

// Define our error loggers
exports.common = function (params) {
  return function consoleRollbar (err, req) {
    console.error(arguments);
  };
};

exports.production = function (params) {
  rollbar.init(rollbarConfig.serverToken, params);
  return function consoleRollbar (err, req) {
    console.error(arguments);
  };
};
