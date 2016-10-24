// Load in our dependencies
var expect = require('chai').expect;
var cheerio = require('cheerio');
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

// Define our tests
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

  it('is counting stars', function () {
    // Grab starCount
    var $ = cheerio.load(this.body);
    var $starCount = $('.project-stars__count');
    expect($starCount.length).to.be.at.least(2);

    // Assert there are stars
    // DEV: Skip over `image-diff` and `spritesmith` due to `1.1k` syntax
    var starCountStr = $starCount.eq(2).text().trim();
    var starCount = +starCountStr;
    expect(starCountStr).to.not.equal('');
    expect(starCount).to.not.equal(0);

    // Check against NaN
    expect(isNaN(starCount)).to.equal(false);
  });
});
