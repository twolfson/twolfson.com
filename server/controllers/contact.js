// Load in dependencies
var assert = require('assert');
var email = require('emailjs');

// Success/failure pages for testing
exports.devSuccess = function (/*config*/) {
  return [
    function devSuccessFn (req, res) {
      res.locals.emailStatus = true;
      exports._render(req, res);
    }
  ];
};
exports.devFailure = function (/*config*/) {
  return [
    function devFailureFn (req, res) {
      res.locals.emailStatus = false;
      exports._render(req, res);
    }
  ];
};

// Default page
exports.index = function (/*config*/) {
  return [
    function indexFn (req, res) {
      // TODO: There seems to be a res.locals leak somehow which requires a locals.emailStatus = null
      // TODO: To reproduce, navigate to /contact/failure -> visit /contact
      // TODO: Expected: Normal contact form. Actual: Failure page displayed
      res.locals.emailStatus = null;
      exports._render(req, res);
    }
  ];
};

// Contact page (submission)
exports.submit = function (config) {
  var emailConf = config.mail;
  assert(emailConf, 'Config did not contain "mail"');
  var emailServer = email.server.connect(emailConf);

  return [
    function submitFn (req, res) {
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
      }, function handleEmailSent (err/*, message*/) {
        res.locals.emailStatus = !err;
        if (err) {
          res.status(502);
        }
        exports._render(req, res);
      });
    }
  ];
};

// Common render function
exports._render = function (req, res) {
  res.render('contact', {
    page: 'contact',
    title: 'Todd Wolfson - Contact',
    seoKeywords: 'contact, email, Todd Wolfson, twolfson, twolfsn',
    seoDescription: 'Contact Todd Wolfson via a form'
  });
};
