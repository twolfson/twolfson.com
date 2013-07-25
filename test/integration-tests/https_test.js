require('./setup');
describe('twolfson.com', function () {
  before(function (done) {
    var that = this,
        httpsPage = config.url('/').replace('http:', 'https:');
    request.get(httpsPage, function getHttpsPage (err, res, body) {
      that.err = err;
      that.res = res;
      that.body = body;
      done(err);
    });
  });

  // TODO: Move to sculptor for easier common usage of these tests
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