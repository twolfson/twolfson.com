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

// DEV: Stopping tracking of this since it bloats analytics
// // If we are in a production environment, track whenever an RSS is requested
// if (inProduction) {
//   app.get('/index.xml', ga);
// }

app.settings['jojo formatter'] = __dirname + '/gfmParser';

var getXmlSummary = jojo.makeSummary(150, true);
jojo.getSummary = function (article, formatter) {
  var rawContent = article.rawContent,
      rawSlice = rawContent.slice(0, 200);

  // Nuder any pre-existing tags
  // TODO: Fully remove tags from source
  rawSlice = rawSlice.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Generate and make an xmlSummary
  article.xmlSummary = getXmlSummary(article, formatter);

  // If there is an _summary, use it
  var _summary = article._summary || rawSlice;

  // Generate and return content
  var content = formatter(_summary);
  return content;
};

// Notify jojo that all its pages are blog posts
jojo.config.page = 'blog';
app.get('*', jojo);

// Portfolio page
var projects = require('./projects'),
    intword = require('./humanize.intword.js');
projects.page = 'projects';
projects.intword = intword;
app.get('/projects', function (req, res) {
  res.render('projects', projects);
});

// If we are in development, add a contact/test page
if (inDevelopment) {
  app.get('/contact', function (req, res, next) {
    var query = req.query || {},
        test = query.test;

    // If there is a test query, render the proper response
    if (test) {
      var emailStatus = test !== 'fail';
      res.render('contact', {'page': 'contact', 'emailStatus': emailStatus});
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
    info.emailStatus = !err;
    res.render('contact', info);
  });
});

// If we are in development, add a kaleidoscope test page
if (inDevelopment) {
  app.get('/kaleido', function (req, res, next) {
    res.render('kaleido', {layout: false});
  });
}

// Expose a health page
var pkg = require('./package'),
    pkgVersion = pkg.version;
app.get('/health', function (req, res) {
  var retObj = {
        'version': pkgVersion,
        'uptime': process.uptime(),
        'memory': process.memoryUsage(),
        'pid': process.pid
      };
  res.send(retObj);
});

// If the page is not found, throw an error and redirect to the 404 page
app.all('*', function (req, res) {
  res.render('404', {'status': 404, 'page': '404'});
});

// Begin listening for requests
app.listen(8080);
console.log("Server running at http://127.0.0.1:8080/");