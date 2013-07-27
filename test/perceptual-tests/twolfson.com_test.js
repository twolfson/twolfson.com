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
// TODO: Optimize space via tarballing expected files?
var browsers = ['phantomjs'],
    baseUrl = 'http://localhost:8080',
    urls = [
      '/',
      '/2012-11-17-subtle-anti-patterns',
      '/2013-07-24-abandoned-project:-kaleidoscope', // Blog post with images
      '/2013-07-27-develop-faster', // Blog post with tables
      '/projects',
      '/contact',
      '/contact?test=success',
      '/contact?test=fail',
      '/404'
    ];

// For each of the URLs
async.map(urls, function (_url, cb) {
  // TODO: mocha-ify this
  // Screenshot the webpage
  var url = baseUrl + _url,
      escapedUrl = encodeURIComponent(url),
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

    // If the expectedImg exists, diff the images
    if (fs.existsSync(expectedImg)) {
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
      exec(diffCmd, processDiff);
    } else {
    // Otherwise, output the image as its own diff
      fs.writeFileSync(diffImg, fs.readFileSync(actualImg, 'binary'),'binary');
      processDiff(null, '', 'New image created!');
    }

    function processDiff(err, stdout, stderr) {
      // If stdout exists, log it
      if (stdout) { console.log('STDOUT: ', stdout); }

      // If there is an error, callback with it
      if (err && !stderr) { return cb(err); }

      // If they don't match, create an error
      // TODO: This will become an assert
      var result = {
            url: url,
            pass: true,
            stderr: stderr
          };
      if (stderr.indexOf('all: 0 (0)') === -1) {
        result.pass = false;
      }

      // Callback with our error
      cb(null, result);
    }
  });
}, function (err, results) {
  var failedResults = results.filter(function (result) {
        return !result.pass;
      });
  if (failedResults.length > 0) {
    failedResults.forEach(function (result) {
      console.log('Failed result for ' + result.url);
      console.log(result.stderr);
    });
    process.exit(1);
  } else {
    console.log('All done!');
    process.exit(0);
  }
});