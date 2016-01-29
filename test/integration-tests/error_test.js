var expect = require('chai').expect;
var errorHandlers = require('../../config/error-handlers');
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

describe('An error generating request', function () {
  var errors = [];
  var logger = errorHandlers.cache({errors: errors});
  serverUtils.run({
    errorHandler: logger,
    throwCaughtErrors: false
  });
  httpUtils.save(serverUtils.getUrl('/errors/assertion'));

  it('sends a 500 page', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(500);
    expect(this.body).to.contain('Todd Wolfson');
  });

  it('logs an error to `errorHandler`', function () {
    expect(errors).to.have.property('length', 1);
    expect(errors[0].err.name).to.equal('AssertionError');
    expect(errors[0].req.url).to.equal('/errors/assertion');
  });
});
