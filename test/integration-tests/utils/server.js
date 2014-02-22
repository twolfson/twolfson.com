var url = require('url');
var _ = require('underscore');
var Server = require('../../../');

exports.getSettings = function () {
  return {
    port: 1337
  };
};

exports.run = function () {
  var server;
  var settings = exports.getSettings();
  before(function startServer () {
    server = new Server();
    server.listen(settings.port);
  });
  after(function stopServer (done) {
    server.destroy(done);
  });
};

exports.getUrl = function (paramStr) {
  // Fallback string as pathname
  var params = paramStr;
  if (typeof params === 'string') {
    params = {
      pathname: paramStr
    };
  }

  // Generate and return url
  return url.format(_.defaults({}, params, exports.getSettings()));
};
// Set up config
var config = {
  host: 'http://127.0.0.1:8080',
  httpsHost: 'https://twolfson.com',
  productionHost: 'http://twolfson.com',
  url: function getUrl (path) {
    return this.host + path;
  },
  navigateToRaw: function (options, cb) {
    // If the options are a string
    if (typeof options === 'string') {
      options = config.url(options);
    } else {
      options.url = config.url(options.url);
    }

    // Call request
    var that = this;
    request(options, function getPage (err, res, body) {
      // Save response
      that.err = err;
      that.res = res;
      that.body = body;

      // Callback
      cb(err);
    });
  },
  navigateTo: function (options) {
    return function navFn (cb) {
      return config.navigateToRaw.call(this, options, cb);
    };
  }
};
global.config = config;