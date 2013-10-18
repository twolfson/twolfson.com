// Success/failure pages for testing
exports.devSuccess = function (req, res) {
  res.locals.emailStatus = true;
  render(req, res);
};
exports.devFailure = function (req, res) {
  res.locals.emailStatus = false;
  render(req, res);
};

// Default page
exports.index = function (req, res) {
  render(req, res);
};

// Contact page (submission)
var email = require('emailjs'),
    emailConf = require('../../config').mail,
    emailServer = email.server.connect(emailConf);
exports.submit = function (req, res) {
  // Parse the body
  var body = req.body,
      message = '';

  // Compose the text message
  message += 'Name: ' + body.name + '\n';
  message += 'Info: ' + body.info + '\n';
  message += 'Message: ' + body.message + '';

  // Send a message to todd
  emailServer.send({
    'text': message,
    'from': 'No Reply <no-reply@twolfson.com>',
    'to': 'Todd Wolfson <todd@twolfson.com>',
    'subject': 'Incoming query from twolfson.com'
  }, function handleEmailSent (err, message) {
    res.locals.emailStatus = !err;
    if (err) {
      res.status(502);
    }
    render(req, res);
  });
};

// Common render function
function render(req, res) {
  res.locals.page = 'contact';
  res.render('contact');
}
