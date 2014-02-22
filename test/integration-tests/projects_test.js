var assert = require('assert');
var fs = require('fs');
var jsdom = require('jsdom');
var jQuerySrc = fs.readFileSync(__dirname + '/../test_files/jquery.js', 'utf8');
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

describe('A request to /projects', function () {
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
    console.log(this.body);
    jsdom.env({
      html: this.body,
      src: [jQuerySrc],
      done: function getProjectsWindow (err, window) {
        // Save the info about the window
        that.window = window;
        done(err);
      }
    });
  });

  it('is counting stars', function () {
    // Grab starCount
    var $ = this.window.$;
    var $starCount = $('.starCount');
    assert.notEqual($starCount.length, 0);

    // Assert there are stars
    // DEV: text seems to be returning a weird number
    var starCountStr = $starCount.html().trim();
    var starCount = +starCountStr;
    assert.notEqual(starCountStr, '');
    assert.notEqual(starCount, 0);

    // Check against NaN
    assert.strictEqual(starCount, starCount);
  });
});
