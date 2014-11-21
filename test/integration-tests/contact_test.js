/* jshint maxlen: 150 */
// Ignore long URL

// Load in our dependencies
var expect = require('chai').expect;
var simplesmtp = require('simplesmtp');
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

// Define test utility
function makeContactRequest() {
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
}

// Start our tests
describe('A request to the /contact form', function () {
  serverUtils.run();
  httpUtils.save(serverUtils.getUrl('/contact'));

  it('has form elements', function () {
    expect(this.body).to.contain('<input');
  });
});

describe('A submission to /contact', function () {
  serverUtils.run();
  before(function startSmtp (done) {
    var settings = serverUtils.getSettings();
    var that = this;

    // Interpretted from https://github.com/eleith/emailjs/blob/0cd982a87cc727253c31bbf2a1808dd9c137d5fd/test/authplain.js#L38-L49
    this.messages = [];
    this.smtpServer = simplesmtp.createServer();
    this.smtpServer.listen(settings.mail.port, function listening () {
      that.smtpServer.on('data', function saveData (envelope, chunk) {
        that.messages.push(chunk);
      });
      that.smtpServer.on('dataReady', function probablyTerminate (envelope, callback) {
        callback(null);
      });
      done();
    });
  });
  after(function stopSmtp (done) {
    this.smtpServer.end(done);
  });
  makeContactRequest();

  it('does not have form elements', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(200);
    expect(this.body).to.not.contain('<input');
  });

  it('thanks you for submitting ;)', function () {
    expect(this.body).to.match(/thank you/i);
  });

  it('sent an email', function () {
    expect(this.messages).to.have.property('length', 2);
    expect(this.messages[0].toString()).to.contain('Name: bdd test\nInfo: n/a\nMessage: Hello World!');
  });
});

describe('A failing submission to /contact', function () {
  serverUtils.run();
  makeContactRequest();

  it('receives a prompt to try again', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(502);
    expect(this.body).to.match(/Could you please try that again\?/i);
  });
});
