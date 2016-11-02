// Load in our dependencies
var expect = require('chai').expect;
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

// Define our tests
describe('A request to blog', function () {
  serverUtils.run();
  httpUtils.save({url: serverUtils.getUrl('/'), expectedStatusCode: 200});

  it('has expected title', function () {
    expect(this.$('title').text()).to.equal('Todd Wolfson - Blog');
  });

  it('has article content', function () {
    expect(this.body).to.contain('February 21, 2012');
    expect(this.body).to.contain('Blog Launch!');
  });

  it('has SEO meta tags', function () {
    expect(this.$('meta[name=keywords]').attr('content')).to.contain('web dev');
    expect(this.$('meta[name=description]').attr('content')).to.contain('development tools');
  });
});
