// DEV: This is actually testing our DNS and not a server but meh.
require('./setup');
describe('twolfsn.com (http)', function () {
  before(function (done) {
    var that = this,
        options = {url: 'http://twolfsn.com', followRedirect: false};
    request.get(options, function (err, res) {
      that.err = err;
      that.res = res;
      done(err);
    });
  });

  testTwolfsn();
});

// TODO: This is non-functional =(
// describe('twolfsn.com (https)', function () {
//   before(function (done) {
//     var that = this;
//     request.get('https://twolfsn.com', function (err, res) {
//       that.err = err;
//       that.res = res;
//       done(err);
//     });
//   });

//   testTwolfsn();
// });

function testTwolfsn() {
  it('responds', function () {
    assert(!this.err);
  });

  it('redirects to twolfson.com', function () {
    var res = this.res;
    assert.strictEqual(res.statusCode, 301);
    assert.strictEqual(res.headers.location, 'http://twolfson.com/');
  });
}