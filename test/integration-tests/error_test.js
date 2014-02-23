var expect = require('chai').expect;
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

describe.only('An error generating request', function () {
  serverUtils.run();
  httpUtils.save(serverUtils.getUrl('/errors/assertion'));

  it('sends a 500 page', function () {
    console.log(this.err);
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(500);
    expect(this.body).to.contain('Todd Wolfson');
  });

  it.skip('logs an error to `errorLogger`', function () {

  });
});
