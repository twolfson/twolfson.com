// Load in dependencies
var rollbar = require('rollbar');

// Define our error loggers
exports.common = function () {
  return function consoleRollbar (err, req) {
    console.error(arguments);
  };
};

exports.production = function () {
  return function consoleRollbar (err, req) {
    console.error(arguments);
  };
};
