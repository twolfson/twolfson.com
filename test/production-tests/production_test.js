var expect = require('chai').expect;
var httpUtils = require('../utils/http');

describe('A request to twolfson.com', function () {
  httpUtils.save({url: 'http://twolfson.com/', expectedStatusCode: 200});

  it('contains the expected Google Analytics id', function () {
    expect(this.body).to.contain('UA-17165993-1');
  });

  it('does not have the /health endpoint', function () {
    expect(this.body).to.not.contain('/health');
  });
});

describe('A gzip tolerant request to twolfson.com', function () {
  httpUtils.save({
    url: 'http://twolfson.com/',
    headers: {
      'Accept-Encoding': 'gzip, deflate'
    },
    expectedStatusCode: 200
  });

  it('receives gzipped content', function () {
    expect(this.res.headers).to.have.property('content-encoding', 'gzip');
  });
});

describe('A request to the twolfson.com/index.js', function () {
  httpUtils.save({url: 'http://twolfson.com/public/js/index.js', expectedStatusCode: 200});

  it('has no errors', function () {
    // Asserted by expectedStatusCode
  });
});

describe('A request to twolfson.com/health', function () {
  httpUtils.save({url: 'http://twolfson.com/health', expectedStatusCode: 200});

  it('marks the environment as production', function () {
    expect(JSON.parse(this.body)).to.have.property('env', 'production');
  });
});
