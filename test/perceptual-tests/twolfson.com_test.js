// Load in dependencies
var assert = require('assert'),
    fs = require('fs'),
    exec = require('child_process').exec,
    async = require('async'),
    imageDiff = require('image-diff'),
    rimraf = require('rimraf'),
    shellQuote = require('shell-quote'),
    serverUtils = require('../utils/server');

// Set up common variables
var expectedScreenshots = __dirname + '/expected_screenshots',
    actualScreenshots = __dirname + '/actual_screenshots',
    diffScreenshots = __dirname + '/diff_screenshots';

// Clean up actual screenshots and diffs
rimraf.sync(actualScreenshots);
rimraf.sync(diffScreenshots);

// Ensure the screenshot diff directory exists
fs.mkdirSync(diffScreenshots);

// Set up unabstracted variables
// TODO: Move browsers, urls into standalone files
// TODO: See notes in https://gist.github.com/twolfson/6077989
// TODO: Optimize space via tarballing expected files?
// var browsers = ['phantomjs'];
// DEV: js-yaml is required to make this require work properly
var yml = require('js-yaml');
var urls = require('./urls.yml');
assert(yml); // DEV: We use assert to silence jshint complaints

// Start a server
var server = serverUtils.startServer();

// For each of the URLs
async.map(urls, function (pathname, done) {
  // Screenshot the webpage
  var url = serverUtils.getUrl(pathname),
      filename = encodeURIComponent(pathname) + '.png',
      actualImg = actualScreenshots + '/' + filename;
  var phantomJsCmd = shellQuote.quote(['phantomjs', 'phantomjs_scripts/screenshot.js', url, actualImg]);
  exec(phantomJsCmd, {cwd: __dirname}, function processScreenshot (err, stdout, stderr) {
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
      expectedImage: expectedScreenshots + '/' + filename,
      diffImage: diffScreenshots + '/' + filename
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
  // Take down server
  server.destroy(function () {
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
});
