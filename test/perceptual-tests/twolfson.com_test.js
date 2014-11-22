// Load in dependencies
var assert = require('assert');
var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var _ = require('underscore');
var async = require('async');
var imageDiff = require('image-diff');
var rimraf = require('rimraf');
var shellQuote = require('shell-quote');
var serverUtils = require('../utils/server');

// TODO: Before landing, re-enable canvas removal (causes timing issues)

// Set up common variables
var expectedScreenshots = __dirname + '/expected_screenshots';
var actualScreenshots = __dirname + '/actual_screenshots';
var diffScreenshots = __dirname + '/diff_screenshots';

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
async.map(urls, function (pathname, done) {
  // Screenshot the webpage
  var url = serverUtils.getUrl(pathname);
  var filename = encodeURIComponent(pathname) + '.png';
  var actualImg = actualScreenshots + '/' + filename;
  var screenshotCmd = shellQuote.quote(['nw', '.', url, actualImg]);
  exec(screenshotCmd, {
    cwd: __dirname + '/node-webkit_scripts/',
    env: _.defaults({
      DISPLAY: DISPLAY
    }, process.env)
  }, function processScreenshot (err, stdout, stderr) {
    // Filter common errors
    if (stderr) {
      stderr = stderr.split(/\n/g).filter(function removeCommon (line) {
        // [2204:1122/064340:ERROR:process_singleton_linux.cc(264)] Failed to create /home/vagrant/.config/twolfson-screenshot/SingletonLock: File exists
        // Xlib:  extension "RANDR" missing on display ":99".
        // [2741:1122/064416:INFO:CONSOLE(1)] ""process.mainModule.filename: /vagrant/test/perceptual-tests/node-webkit_scripts/index.html"", source: process_main (1)
        return !line.match(/process_singleton_linux.cc|Xlib:  extension "RANDR"|process.mainModule.filename/);
      }).join('\n');
    }

    // If stderr or stdout exist, log them
    if (stderr) { console.log('NODE-WEBKIT STDERR: ', stderr); }
    if (stdout) { console.log('NODE-WEBKIT STDOUT: ', stdout); }

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
