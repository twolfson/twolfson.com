var expect = require('chai').expect;
var smtp = require('smtp-protocol');
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

describe('A request to the /contact form', function () {
  serverUtils.run();
  httpUtils.save(serverUtils.getUrl('/contact'));

  it('has form elements', function () {
    expect(this.body).to.contain('<input');
  });
});

describe.only('A submission to /contact', function () {
  serverUtils.run();
  before(function startSmtp () {
    this.smtpServer = smtp.createServer(function handleReq (req) {

    });
    this.smtpServer.listen(1338);
  });
  after(function stopSmtp (done) {
    this.smtpServer.close(done);
  });
  before(function (done) {
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
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(200);
    // expect(this.body).to.not.contain('<input');
  });

  it('thanks you for submitting ;)', function () {
    // expect(this.body).to.match(/thank you/i);
  });
});
