var expect = require('chai').expect;
var xml2js = require('xml2js');
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

describe('A request to /index.xml', function () {
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
    expect(this.xml.feed.title).to.deep.equal(['Todd Wolfson - Software Engineer']);
    expect(this.xml.feed.id).to.deep.equal(['http://twolfson.com/']);
    expect(this.xml.feed.author).to.be.deep.equal([{name: ['Todd Wolfson']}]);
    expect(this.xml.feed.entry.length).to.be.greaterThan(0);
  });
});
