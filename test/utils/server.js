var url = require('url');
var _ = require('underscore');
var Server = require('../../');

exports.getSettings = function () {
  return {
    protocol: 'http',
    hostname: 'localhost',
    port: 1337
  };
};

exports.startServer = function () {
  var settings = exports.getSettings();
  var server = new Server();
  server.listen(settings.port);
  return server;
};

exports.run = function () {
  var server;
  before(function startServer () {
    server = exports.startServer();
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

// host: 'http://127.0.0.1:8080',
// httpsHost: 'https://twolfson.com',
// productionHost: 'http://twolfson.com',
