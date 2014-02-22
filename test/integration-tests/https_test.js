// TODO: Relocate into production test
var expect = require('chai').expect;
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

describe('twolfson.com', function () {
  httpUtils.save({
    url: 'https://twolfson.com/',
    followRedirect: false,
    strictSSL: false
  });

  it('is responding with valid status code', function () {
    expect(this.err).to.equal(null);
    expect(this.res).to.have.property('statusCode', 200);
  });

  it('is responding with content', function () {
    expect(this.body).to.contain('Todd Wolfson');
  });
});
