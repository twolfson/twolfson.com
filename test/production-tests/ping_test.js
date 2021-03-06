var expect = require('chai').expect;
var httpUtils = require('../utils/http');

// Start our test suite
describe('A request to twolfson.com', function () {
  httpUtils.save({url: 'http://twolfson.com/', expectedStatusCode: 200});

  it('is responding with valid status code', function () {
    // Asserted by expectedStatusCode
  });

  it('is responding with content', function () {
    expect(this.body).to.contain('Todd Wolfson');
  });
});
