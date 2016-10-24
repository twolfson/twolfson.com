// Load in dependencies
var raven = require('raven');
var ravenParsers = require('raven/lib/parsers');

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

exports.sentry = function (sentryConfig, params) {
  var sentryClient = new raven.Client(sentryConfig.serverDSN, params);
  return function sentryLogger (err, req) {
    // https://github.com/getsentry/raven-node/blob/0.12.0/lib/middleware/connect.js#L21-L25
    var kwargs = req ? ravenParsers.parseRequest(req) : {};
    sentryClient.captureError(err, kwargs);
  };
};
