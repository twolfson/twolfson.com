var expect = require('chai').expect;
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

describe('A request to the /contact form', function () {
  serverUtils.run();
  httpUtils.save(serverUtils.getUrl('/contact'));

  it('has form elements', function () {
    expect(this.body).to.contain('<input');
  });
});

describe.skip('A submission to twolfson.com/contact', function () {
  var options = {
    url: '/contact',
    method: 'POST',
    form: {
      'name': 'bdd test',
      'info': 'n/a',
      'message': 'Hello World!'
    }
  };
  before(function (done) {
    this.timeout(5000);
    config.navigateToRaw.call(this, options, done);
  });

  it('does not have form elements', function () {
    var body = this.body;
    assert.strictEqual(body.indexOf('<input'), -1);
  });

  it('thanks you for submitting ;)', function () {
    var body = this.body;
    assert(body.match(/thank you/i));
  });
});
