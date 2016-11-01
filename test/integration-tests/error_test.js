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

  it('has expected title', function () {
    expect(this.$('title').to.equal('Server error - Todd Wolfson');
  });

  it('logs an error to `errorHandler`', function () {
    expect(errors).to.have.property('length', 1);
    expect(errors[0].err.name).to.equal('AssertionError');
    expect(errors[0].req.url).to.equal('/errors/assertion');
  });
});

describe('A request to a missing page', function () {
  serverUtils.run();
  httpUtils.save(serverUtils.getUrl('/404'));

  it('receives 404 response', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(404);
  });

  it('has expected title', function () {
    expect(this.$('title').to.equal('Page not found - Todd Wolfson');
  });

  it('has helpful content', function () {
    expect(this.body).to.contain('The page you are looking for could not be found');
  });
});
