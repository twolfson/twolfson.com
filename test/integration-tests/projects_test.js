var fs = require('fs');
var expect = require('chai').expect;
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
    var $starCount = $('project-stars__count');
    expect($starCount.length).to.not.equal(0);

    // Assert there are stars
    // DEV: text seems to be returning a weird number
    var starCountStr = $starCount.html().trim();
    console.log('wat', $starCount.html().length);
    var starCount = +starCountStr;
    expect(starCountStr).to.not.equal('');
    expect(starCount).to.not.equal(0);

    // Check against NaN
    expect(isNaN(starCount)).to.equal(false);
  });
});
