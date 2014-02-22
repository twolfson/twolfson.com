var expect = require('chai').expect;
var xml2js = require('xml2js');
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

describe.only('A request to /index.xml', function () {
  serverUtils.run();
  httpUtils.save(serverUtils.getUrl('/index.xml'));
  before(function detectErrors (done) {
    done(this.err);
  });
  before(function parseXml (done) {
    var that = this;
    var parser = new xml2js.Parser();
    parser.parseString(this.body, function (err, xml) {
      that.xml = xml;
      done(err);
    });
  });

  it('returns a list of articles', function () {
    console.log(this.xml);
    expect(this.xml).to.equal(null);
  });
});
