// Load in modules
var assert = require('assert'),
    request = require('request'),
    config = {
      host: 'http://twolfson.com',
      url: function getUrl (path) {
        return this.host + path;
      }
    };

describe('twolfson.com', function () {
  before(function (done) {
    // Grab index page
    var that = this,
        index = config.url('/');
    request.get(index, function getIndexPage (err, res, body) {
      // Save response
      that.err = err;
      that.res = res;
      that.body = body;

      // Callback
      done(err);
    });
  });

  it('is responding', function () {
    assert(!this.err);
  });

  it('is responding with valid status code', function () {
    var statusCode = this.res.statusCode;
    assert(statusCode >= 200, statusCode + ' is not above 200');
    assert(statusCode < 300, statusCode + ' is not under 300');
  });

  it('is responding with content', function () {
    assert(this.body);
  });
});