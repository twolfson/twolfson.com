require('./setup');
describe('twolfson.com/projects', function () {
  before(function (done) {
    // Open the proper page
    var that = this;
    config.navigateToRaw.call(that, '/projects', function (err) {
      // If there was an error, call back with it
      if (err) { return done(err); }

      // Otherwise, create a window object
      jsdom.env({
        html: that.body,
        src: [jquerySrc],
        done: function getProjectsWindow (err, window) {
          // Save the info about the window
          that.windowErr = err;
          that.window = window;

          // Callback with any error
          done(err);
        }
      });
    });
  });

  it('is counting stars', function () {
    // Grab starCount
    var $ = this.window.$,
        $starCount = $('.starCount');
    assert.notEqual($starCount.length, 0);

    // Assert there are stars
    // text seems to be returning a weird number
    // var starCountStr = $starCount.text().trim(),
    var starCountStr = $starCount.html().trim(),
        starCount = +starCountStr;
    assert.notEqual(starCountStr, '');
    assert.notEqual(starCount, 0);

    // Check against NaN
    assert.strictEqual(starCount, starCount);
  });
});