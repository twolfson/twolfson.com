// Load in modules
var assert = require('assert'),
    request = require('request'),
    config = {
      host: 'http://twolfson.com',
      url: function getUrl (path) {
        return host + path;
      }
    };

describe('twolfson.com', function () {
  // Grab index page
  before(function (done) {
    var that = this,
        index = config.url('/');
    request.get(index, function getIndexPage (err, res, body) {
      that.err = err;
      that.res = res;
      that.body = body;
    });
  });

  is('responding', function () {
    assert(!this.err);
  });

  is('responding with valid status code', function () {
    var statusCode = res.statusCode;
    console.log(statusCode);
    // assert(this
  });

  is('responding with content', function () {
    // TODO: COntinue
  });
});