require('./setup');
describe('twolfson.com', function () {
  before(function (done) {
    var that = this,
        index = config.url('/');
    request.get(index, function getIndexPage (err, res, body) {
      that.body = body;
      done(err);
    });
  });

  it('does not have developer tools', function () {
    var body = this.body,
        health = body.indexOf('/health'),
        stylesheet = body.indexOf('link[rel="stylesheet"]');
    assert.strictEqual(health, -1);
    assert.strictEqual(stylesheet, -1);
  });

  it('does have analytics', function () {
    var body = this.body;
    assert.notEqual(body.indexOf('_gaq'), -1);
  });
});