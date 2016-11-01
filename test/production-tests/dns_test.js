// DEV: This is actually testing our DNS and not a server but meh.
var expect = require('chai').expect;
var httpUtils = require('../utils/http');

describe('twolfsn.com (http)', function () {
  httpUtils.save({
    url: 'http://twolfsn.com',
    followRedirect: false,
    expectedStatusCode: 301
  });

  it('redirects to twolfson.com', function () {
    expect(this.res.headers).to.have.property('location', 'http://twolfson.com/');
  });
});

// TODO: This is non-functional =(
describe.skip('twolfsn.com (https)', function () {
  httpUtils.save({
    url: 'https://twolfsn.com',
    followRedirect: false,
    expectedStatusCode: 301
  });

  it('redirects to twolfson.com', function () {
    expect(this.res.headers).to.have.property('location', 'https://twolfson.com/');
  });
});
