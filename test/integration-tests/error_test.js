var expect = require('chai').expect;
var errorLoggers = require('../../config/error-loggers');
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

describe('An error generating request', function () {
  var errors = [];
  var logger = errorLoggers.cache({errors: errors});
  serverUtils.run({
    errorLogger: logger,
    throwCaughtErrors: false
  });
  httpUtils.save(serverUtils.getUrl('/errors/assertion'));

  it('sends a 500 page', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(500);
    expect(this.body).to.contain('Todd Wolfson');
  });

  it('logs an error to `errorLogger`', function () {
    expect(errors).to.have.property('length', 1);
    expect(errors[0].err.message).to.contain('"hello" === "world"');
    expect(errors[0].req.url).to.contain('/errors/assertion');
  });
});
