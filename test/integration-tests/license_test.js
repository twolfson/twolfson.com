// Load in our dependencies
var expect = require('chai').expect;
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

// Define our tests
describe('A request to /license', function () {
  serverUtils.run();
  httpUtils.save({url: serverUtils.getUrl('/license'), expectedStatusCode: 200});

  it('has expected title', function () {
    expect(this.$('title').text()).to.equal('Todd Wolfson - License');
  });

  it('renders our license', function () {
    expect(this.body).to.contain('Permission is hereby granted');
  });
});
