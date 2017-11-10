// Load in dependencies
var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var _ = require('underscore');
var async = require('async');
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
void yml; // DEV: We use void to silence lint complaints

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
  /* eslint-disable no-console */
  console.error('Xvfb exited early', code);
  console.error('XVFB STDOUT:', xvfbStdout);
  console.error('XVFB STDERR:', xvfbStderr);
  process.exit(1);
  /* eslint-enable no-console */
});

// For each of the URLs
async.mapLimit(urls, 2, function comparePages (pathname, done) {
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
        /* eslint-disable max-len */
        // [2204:1122/064340:ERROR:process_singleton_linux.cc(264)] Failed to create /home/vagrant/.config/twolfson-screenshot/SingletonLock: File exists
        // Xlib:  extension "RANDR" missing on display ":99".
        // [2741:1122/064416:INFO:CONSOLE(1)] ""process.mainModule.filename: /vagrant/test/perceptual-tests/node-webkit_scripts/index.html"", source: process_main (1)
        // [2386:1122/071837:ERROR:connection.cc(1060)] Web sqlite error 5, errno 0: database is locked, sql: CREATE TABLE meta(key LONGVARCHAR NOT NULL UNIQUE PRIMARY KEY, value LONGVARCHAR)
        // [2386:1122/071837:ERROR:web_data_service_backend.cc(54)] Cannot initialize the web database: 1
        // [2386:1122/071838:WARNING:nw_form_database_service.cc(21)] initializing autocomplete database failed
        // [2355:1122/072609:WARNING:simple_index_file.cc(337)] Could not map Simple Index file.
        // [13908:1122/080439:ERROR:browser_main_loop.cc(162)] Running without the SUID sandbox! See https://code.google.com/p/chromium/wiki/LinuxSUIDSandboxDevelopment for more information on developing with the sandbox on.
        // [13908:1122/080439:WARNING:process_singleton_posix.cc(623)] Not handling interprocess notification as browser is shutting down
        /* eslint-enable max-len */
        return !(line.match(/process_singleton_linux.cc|Xlib:  extension "RANDR"/) ||
          line.match(/process.mainModule.filename|connection.cc|web_data_service_backend.cc/) ||
          line.match(/nw_form_database_service.cc|simple_index_file.cc|browser_main_loop.cc/) ||
          line.match(/process_singleton_posix.cc/));
      }).join('\n');
    }

    // If stderr or stdout exist, log them
    /* eslint-disable no-console */
    if (stderr) { console.log('NODE-WEBKIT STDERR: ', stderr); }
    if (stdout) { console.log('NODE-WEBKIT STDOUT: ', stdout); }
    /* eslint-enable no-console */

    // If there is an error, callback with it
    if (err) { return done(err); }

    // TODO: Emit an event instead
    // Notify the user that we have screenshotted successfully
    // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
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
          // eslint-disable-next-line no-console
          console.log('Failed result for ' + result.url);
        });
        process.exit(1);
      } else {
      // Otherwise, exit gracefully
        // eslint-disable-next-line no-console
        console.log('All done!');
        process.exit(0);
      }
    });
  });
});
