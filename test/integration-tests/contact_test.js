// Load in our dependencies
var expect = require('chai').expect;
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

// Start our tests
describe('A request to the /contact page', function () {
  serverUtils.run();
  httpUtils.save({url: serverUtils.getUrl('/contact'), expectedStatusCode: 200});

  it('has expected title', function () {
    expect(this.$('title').text()).to.equal('Todd Wolfson - Contact');
  });

  it('has SEO meta tags', function () {
    expect(this.$('meta[name=keywords]').attr('content')).to.contain('contact');
    expect(this.$('meta[name=description]').attr('content')).to.contain('Contact Todd');
  });
});
