// DEV: This is actually testing our DNS and not a server but meh.
// TODO: Relocate into production-tests
var expect = require('chai').expect;
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

describe('twolfsn.com (http)', function () {
  httpUtils.save({
    url: 'http://twolfsn.com',
    followRedirect: false
  });

  it('redirects to twolfson.com', function () {
    expect(this.err).to.equal(null);
    expect(this.res).to.have.property('statusCode', 301);
    expect(this.res.headers).to.have.property('location', 'http://twolfson.com/');
  });
});

// TODO: This is non-functional =(
describe.skip('twolfsn.com (https)', function () {
  httpUtils.save({
    url: 'https://twolfsn.com',
    followRedirect: false
  });

  it('redirects to twolfson.com', function () {
    expect(this.err).to.equal(null);
    expect(this.res).to.have.property('statusCode', 301);
    expect(this.res.headers).to.have.property('location', 'https://twolfson.com/');
  });
});
