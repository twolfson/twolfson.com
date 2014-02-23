// Load in dependencies
var util = require('util');
var rollbar = require('rollbar');
var rollbarConfig = require('./secret').rollbar;

// Define our error loggers
exports.common = function (params) {
  return function consoleRollbar (err, req) {
    var msg = util.format('[error-logger]: %s %s %s', req.method, req.url, util.inspect(err));
    util.log(msg);
  };
};

exports.production = function (params) {
  rollbar.init(rollbarConfig.serverToken, params);
  return function consoleRollbar (err, req) {
    rollbar.handleError(err, req);
  };
};
