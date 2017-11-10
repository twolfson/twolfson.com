var url = require('url');
var _ = require('underscore');
var Server = require('../../');
var config = require('../../config');

exports.getSettings = function (params) {
  return _.extend({}, config.getSettings({env: 'test'}), params || {});
};

exports.startServer = function (params) {
  var settings = exports.getSettings(params);
  var server = new Server(settings);
  server.listen();
  return server;
};

exports.run = function (params) {
  var server;
  before(function startServer() {
    server = exports.startServer(params);
  });
  after(function stopServer(done) {
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
  return url.format(_.defaults({}, params, exports.getSettings().url.internal));
};
