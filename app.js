// Create the server
var express = require('express'),
		app = express.createServer(),
    jojo = require('jojo'),
    GA = require('./ga'),
    ga = GA(),
    NODE_ENV = process.env.NODE_ENV,
    inProduction = NODE_ENV === 'production',
    inDevelopment = !inProduction;

// Set up view engine and static files for pages
app.set('view engine', 'ejs');
app.use('/public', express['static'](__dirname + '/dist'));
app.use('/public', express['static'](__dirname + '/public'));

// If we are in a production environment, track whenever an RSS is requested
if (inProduction) {
  app.get('/index.xml', ga);
}

// Notify jojo that all its pages are blog posts
jojo.config.page = 'blog';
app.get('*', jojo);

// DEPRECATED
// // Bind jobs JSON to resume (there are single quotes in my JSON so &*#! require in this case)
// var fs = require('fs'),
//     jobsJson = fs.readFileSync('./jobs.json', 'utf8'),
//     jobs = (new Function('return ' + jobsJson + ';')());
// app.get('/resume', function (req, res) {
//   res.render('resume', {'page': 'resume', 'jobs': jobs});
// });

// Portfolio page
app.get('/portfolio', function (req, res) {
  res.render('portfolio', {'page': 'portfolio'});
});

// TODO: If we are in development, add a contact/test page
if (inDevelopment) {
  app.get('/contact', function (req, res, next) {
    var query = req.query || {},
        test = query.test;

    // If there is a test query, render the proper response
    if (test) {
      var status = test !== 'fail';
      res.render('contact', {'page': 'contact', 'status': status});
    } else {
    // Otherwise, continue
      next();
    }
  });
}

// Contact page (initial view)
app.get('/contact', function (req, res) {
  res.render('contact', {'page': 'contact'});
});

// Set up email server interaction
var email = require('emailjs'),
    emailConf = require('./mail.conf'),
    emailServer = email.server.connect(emailConf);

// Contact page (submission)
app.post('/contact', express.bodyParser());
app.post('/contact', function (req, res, next) {
  // Parse the body
  var info = {'page': 'contact'},
      body = req.body,
      message = "";

  // Compose the text message
  message += "Name: " + body.name + "\n";
  message += "Info: " + body.info + "\n";
  message += "Message: " + body.message + "";

  // Send a message to todd
  emailServer.send({
    'text': message,
    'from': 'No Reply <no-reply@twolfson.com>',
    'to': 'Todd Wolfson <todd@twolfson.com>',
    'subject': 'Incoming query from twolfson.com'
  }, function (err, message) {
    info.status = !err;
    res.render('contact', info);
  });
});

// If the page is not found, throw an error and redirect to the 404 page
app.all('*', function (req, res) {
  res.render('404', {'status': 404, 'page': '404'});
});

// Begin listening for requests
app.listen(8080);
console.log("Server running at http://127.0.0.1:8080/");