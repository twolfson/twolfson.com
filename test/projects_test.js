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
    // Verify jQuery is on the page
    console.log(this.window);
  });
});