// Load in dependencies
var fs = require('fs'),
    exec = require('child_process').exec,
    async = require('async'),
    slug = require('slug');

// Set up common variables
var expectedScreenshots = __dirname + '/expected_screenshots',
    actualScreenshots = __dirname + '/actual_screenshots',
    screenshotDiffs = __dirname + '/screenshot_diffs';

// Ensure the screenshot diff directory exists
try { fs.mkdirSync(screenshotDiffs); } catch (e) {}

// Set up unabstracted variables
// TODO: Move browsers, urls into standalone files
// TODO: See notes in https://gist.github.com/twolfson/6077989
var browsers = ['phantomjs'],
    baseUrl = 'http://localhost:8080',
    urls = [
      '/',
      // '/2012-11-17-subtle-anti-patterns',
      // '/projects',
      // '/contact',
      // '/contact?test=success',
      // '/contact?test=fail',
      // '/404'
    ];

// For each of the URLs
async.forEach(urls, function (_url, cb) {
  // TODO: mocha-ify this
  // TODO: Screenshot the webpage
  var url = baseUrl + _url,
      escapedUrl = slug(url.replace(/\//g, '_')),
      filepath = '/' + escapedUrl + '.png',
      expectedImg = expectedScreenshots + filepath,
      actualImg = actualScreenshots + filepath,
      diffImg = screenshotDiffs + filepath;
  exec('phantomjs screenshot.js ' + url + ' ' + actualImg, {cwd: __dirname}, function processScreenshot (err, stdout, stderr) {
    // If stderr or stdout exist, log them
    if (stderr) { console.log('STDERR: ', stderr); }
    if (stdout) { console.log('STDOUT: ', stdout); }

    // If there is an error, callback with it
    if (err) { return cb(err); }

    // TODO: Emit an event instead
    // Notify the user that we have screenshotted successfully
    console.log('Successfully screenshotted ' + url);

    // Diff the images
    var diffCmd = [
          'compare',
          '-verbose',
          '-metric RMSE',
          '-highlight-color RED',
          '-compose Src',
          expectedImg,
          actualImg,
          diffImg
        ].join(' ');
    exec(diffCmd, function processDiff (err, stdout, stderr) {
      // If stdout exists, log it
      if (stdout) { console.log('STDOUT: ', stdout); }

      // If there is an error, callback with it
      if (err && !stderr) { return cb(err); }

      // If they don't match, create an error
      // TODO: This will become an assert
      if (stderr.indexOf('all: 0 (0)') === -1) {
        err = new Error(url + ' does not match expected screenshot');
        console.log('STDERR: ', stderr);
      }

      // Callback with our error
      cb(err);
    });
  });
}, function (err) {
  if (err) {
    console.error('ERROR: ', err);
  } else {
    console.log('All done!');
  }
});