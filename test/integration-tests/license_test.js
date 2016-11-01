// Load in our dependencies
var expect = require('chai').expect;
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

// Define our tests
describe('A request to /license', function () {
  serverUtils.run();
  httpUtils.save(serverUtils.getUrl('/license'));

  it('has no errors', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(200);
  });

  it('has expected title', function () {
    expect(this.$('title')).to.equal('Todd Wolfson - Contact');
  });

  it('renders our license', function () {
    expect(this.body).to.contain('Permission is hereby granted');
  });
});
