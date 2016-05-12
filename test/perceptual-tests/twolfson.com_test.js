// Load in dependencies
var assert = require('assert');
var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var _ = require('underscore');
var async = require('async');
var electronPath = require('electron-prebuilt');
var imageDiff = require('image-diff');
var rimraf = require('rimraf');
var shellQuote = require('shell-quote');
var serverUtils = require('../utils/server');

// Set up common variables
var expectedScreenshots = __dirname + '/expected_screenshots';
var actualScreenshots = __dirname + '/actual_screenshots';
var diffScreenshots = __dirname + '/diff_screenshots';

// Clean up actual screenshots and diffs
rimraf.sync(actualScreenshots);
rimraf.sync(diffScreenshots);

// Ensure the screenshot diff directory exists
fs.mkdirSync(actualScreenshots);
fs.mkdirSync(diffScreenshots);

// DEV: js-yaml is required to make this require work properly
var yml = require('js-yaml');
var urls = require('./urls.yml');
assert(yml); // DEV: We use assert to silence jshint complaints

// Start a server
var server = serverUtils.startServer();

// Start up Xvfb
var DISPLAY = ':99';
var xvfbChild = spawn('Xvfb', [DISPLAY]);

// Collect xvfb stdout and stderr
var xvfbStdout = '';
var xvfbStderr = '';
xvfbChild.stdout.on('data', function addStdout (buff) {
  xvfbStdout += buff;
});
xvfbChild.stderr.on('data', function addStderr (buff) {
  xvfbStderr += buff;
});

// If xvfb terminates
xvfbChild.on('exit', function handleXvfbPrematureExit (code) {
  console.error('Xvfb exited early', code);
  console.error('XVFB STDOUT:', xvfbStdout);
  console.error('XVFB STDERR:', xvfbStderr);
  process.exit(1);
});

// For each of the URLs
async.mapLimit(urls, 2, function comparePages (pathname, done) {
  // Screenshot the webpage
  var url = serverUtils.getUrl(pathname);
  var filename = encodeURIComponent(pathname) + '.png';
  var actualImg = actualScreenshots + '/' + filename;
  var screenshotCmd = shellQuote.quote([
    electronPath, __dirname + '/electron_scripts/screenshot-main.js', url, actualImg]);
  exec(screenshotCmd, {
    env: _.defaults({
      DISPLAY: DISPLAY
    }, process.env)
  }, function processScreenshot (err, stdout, stderr) {
    // Filter common errors
    if (stderr) {
      stderr = stderr.split(/\n/g).filter(function removeCommonError (line) {
        // Xlib:  extension "RANDR" missing on display ":99".
        return !line.match(/Xlib:  extension "RANDR"/);
      }).join('\n');
    }

    // If stderr or stdout exist, log them
    if (stderr) { console.log('ELECTRON STDERR: ', stderr); }
    if (stdout) { console.log('ELECTRON STDOUT: ', stdout); }

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
}, function handleResults (err, results) {
  // Stop Xvfb
  xvfbChild.kill();
  xvfbChild.removeAllListeners('exit');
  xvfbChild.on('exit', function handleXvfbExit () {
    // Take down server
    server.destroy(function handleServerExit () {
      // If there was an error, log it and leave
      if (err) {
        console.error('SERVER-DESTROY ERROR: ', err);
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
});
