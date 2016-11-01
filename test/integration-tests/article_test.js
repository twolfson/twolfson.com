// Load in our dependencies
var expect = require('chai').expect;
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

// Define our tests
describe('A request to an article', function () {
  serverUtils.run();
  httpUtils.save({url: serverUtils.getUrl('/2012-02-21-blog-launch'), expectedStatusCode: 200});

  it('has no errors', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(200);
  });

  it('has expected title', function () {
    expect(this.$('title')).to.equal('Blog Launch - Todd Wolfson');
  });

  it('has article content', function () {
    expect(this.body).to.contain('February 21, 2012');
    expect(this.body).to.contain('Blog Launch!');
    expect(this.body).to.contain('This is my first blog post for twolfson.com!');
  });
});
