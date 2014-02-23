// Load in dependencies
var rollbar = require('rollbar');

// Define our error loggers
exports.common = function (params) {
  return function consoleRollbar (err, req) {
    console.error(arguments);
  };
};

exports.production = function (params) {
  rollbar.init(params);
  return function consoleRollbar (err, req) {
    console.error(arguments);
  };
};
