// Load in dependencies
var fs = require('fs'),
    exec = require('child_process').exec,
    async = require('async'),
    imageDiff = require('image-diff');

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
    // DEV: js-yaml is required to make this require work properly
    yml = require('js-yaml'),
    urls = require('./urls.yml');

// For each of the URLs
async.map(urls, function (_url, done) {
  // TODO: mocha-ify this
  // Screenshot the webpage
  var url = baseUrl + _url,
      escapedUrl = encodeURIComponent(url),
      filepath = '/' + escapedUrl + '.png',
      actualImg = actualScreenshots + filepath;
  exec('phantomjs screenshot.js ' + url + ' ' + actualImg, {cwd: __dirname}, function processScreenshot (err, stdout, stderr) {
    // If stderr or stdout exist, log them
    if (stderr) { console.log('STDERR: ', stderr); }
    if (stdout) { console.log('STDOUT: ', stdout); }

    // If there is an error, callback with it
    if (err) { return done(err); }

    // TODO: Emit an event instead
    // Notify the user that we have screenshotted successfully
    console.log('Successfully screenshotted ' + url);

    imageDiff({
      actualImage: actualImg,
      expectedImage: expectedScreenshots + filepath,
      diffImage: screenshotDiffs + filepath
    }, function handleDiffResult (err, imagesAreSame) {
      // If there was an error, callback with it
      if (err) { return done(err); }

      // Otherwise, callback with result
      done(null, {
        url: url,
        pass: imagesAreSame
      });
    });
  });
}, function (err, results) {
  // If there was an error, log it and leave
  if (err) {
    console.error('ERROR: ', err);
    return process.exit(1);
  }

  // Otherwise, determine if there were any failures
  var failedResults = results.filter(function (result) {
        return !result.pass;
      });

  // If there were failures, log them and leave
  if (failedResults.length > 0) {
    failedResults.forEach(function (result) {
      console.log('Failed result for ' + result.url);
    });
    process.exit(1);
  } else {
  // Otherwise, exit gracefully
    console.log('All done!');
    process.exit(0);
  }
});