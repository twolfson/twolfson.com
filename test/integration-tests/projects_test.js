var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

describe('twolfson.com/projects', function () {
  serverUtils.run();
  httpUtils.save(serverUtils.getUrl('/projects'));
  before(function handleError (done) {
    if (this.err) {
      done(this.err);
    } else {
      process.nextTick(done);
    }
  });
  before(function loadPage (done) {
    // Create a window object
    var that = this;
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