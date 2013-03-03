require('./setup');
describe('twolfson.com/contact', function () {
  before(config.navigateTo('/contact'));

  it('has form elements', function () {
    var body = this.body;
    assert.notEqual(body.indexOf('<input'), -1);
  });
});

describe('A submission to twolfson.com/contact', function () {
  var options = {
    url: '/contact',
    method: 'POST',
    form: {
      'name': 'bdd test',
      'info': 'n/a',
      'message': 'Hello World!'
    }
  };
  before(config.navigateTo(options));

  it('does not have form elements', function () {
    var body = this.body;
    assert.strictEqual(body.indexOf('<input'), -1);
  });

  it('thanks you for submitting ;)', function () {
    var body = this.body;
    assert(body.match(/thank you/i));
  });
});