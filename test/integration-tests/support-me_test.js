// Load in our dependencies
var expect = require('chai').expect;
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

// Define our tests
describe('A request to /support-me', function () {
  serverUtils.run();
  httpUtils.save(serverUtils.getUrl('/support-me'));

  it('has no errors', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(200);
  });

  it('has expected title', function () {
    expect(this.$('title')).to.equal('Todd Wolfson - Contact');
  });

  it('renders our links to our support pages', function () {
    expect(this.body).to.contain('Gratipay');
    expect(this.body).to.contain('PayPal');
    expect(this.body).to.contain('Bitcoin');
  });
});
