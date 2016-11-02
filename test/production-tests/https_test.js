var expect = require('chai').expect;
var httpUtils = require('../utils/http');

describe('twolfson.com', function () {
  httpUtils.save({
    url: 'https://twolfson.com/',
    followRedirect: false,
    strictSSL: false,
    expectedStatusCode: 200
  });

  it('is responding with valid status code', function () {
    // Asserted by expectedStatusCode
  });

  it('is responding with content', function () {
    expect(this.body).to.contain('Todd Wolfson');
  });
});
