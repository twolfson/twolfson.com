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

describe('A submission to /contact', function () {
  serverUtils.run();
  before(function (done) {
    this.timeout(5000);
    httpUtils._save({
      url: serverUtils.getUrl('/contact'),
      method: 'POST',
      form: {
        'name': 'bdd test',
        'info': 'n/a',
        'message': 'Hello World!'
      }
    }).call(this, done);
  });

  it('does not have form elements', function () {
    expect(this.body).to.not.contain('<input');
  });

  it('thanks you for submitting ;)', function () {
    expect(this.body).to.match(/thank you/i);
  });
});
