require('./setup');
describe('twolfson.com', function () {
  before(function (done) {
    var that = this,
        index = config.productionHost + '/';
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
});

describe('twolfson.com script', function () {
  before(function (done) {
    var that = this,
        indexScript = config.productionHost + '/public/js/index.js';
    request.get(indexScript, function getIndexScript (err, res, script) {
      that.script = script;
      done(err);
    });
  });

  it('does not have developer tools', function () {
    var script = this.script,
        googleAnalytics = script.indexOf('_gaq'),
        googleAnalyticsId = script.indexOf('UA-17165993-1');
    assert.notEqual(googleAnalytics, -1);
    assert.notEqual(googleAnalyticsId, -1);
  });
});