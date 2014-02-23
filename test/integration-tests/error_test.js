var expect = require('chai').expect;
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

describe.only('An error generating request', function () {
  serverUtils.run();
  httpUtils.save('/errors/assertion');

  it.skip('logs an error to `errorLogger`', function () {

  });

  it('sends a 500 page', function () {

  });
});
