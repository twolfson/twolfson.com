// Load in dependencies
var fs = require('fs'),
    yml = require('js-yaml'),
    exec = require('child_process').exec,
    async = require('async'),
    slug = require('slug'),
    TempFile = require('temporary/lib/file');

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
    urls = require('./urls');

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
      // Get the sizes of the images
      async.parallel([
        function getActualSize (cb) {
          exec('identify ' + actualImg, cb);
        },
        function getExpectedSize (cb) {
          exec('identify ' + expectedImg, cb);
        }
      ], function processResults(err, results) {
        // If there was an error, callback
        if (err) { return cb(err); }

        // Process the image sizes
        var actualStdout = results[0][0],
            actualSize = actualStdout.match(/(\d+)x(\d+)/),
            actualWidth = +actualSize[1],
            actualHeight = +actualSize[2],
            expectedStdout = results[1][0],
            expectedSize = expectedStdout.match(/(\d+)x(\d+)/),
            expectedWidth = +expectedSize[1],
            expectedHeight = +expectedSize[2];

        // If the sizes are different
        if (actualWidth !== expectedWidth || actualHeight !== expectedHeight) {
          // Find the maximum dimensions
          var width = Math.max(actualWidth, expectedWidth),
              height = Math.max(actualHeight, expectedHeight),
              geometry = width + 'x' + height + '+0+0';

          // Resize both images
          async.parallel([
            function resizeActualImage (cb) {
              // Save the original file path and generate a temporary file
              var origFile = actualImg,
                  tmpFile = new TempFile();

              // Save over the original path
              actualImg = tmpFile.path + '.png';

              // Crop our file
              var cmd = [
                    'convert',
                    origFile,

                    // Fill in new space with white background
                    '-bordercolor white',
                    '-border ' + (width - actualWidth) +
                      'x' + (height - actualHeight),

                    // Anchor image to upper-left
                    '-gravity SouthEast',

                    // Specify new image size
                    '-crop ' + geometry,

                    // Specify the image location
                    actualImg
                  ].join(' ');
              exec(cmd, cb);
            },
            function resizeExpectedImage (cb) {
              // Save the original file path and generate a temporary file
              var origFile = expectedImg,
                  tmpFile = new TempFile();

              // Save over the original path
              expectedImg = tmpFile.path + '.png';

              // Crop our file
              var cmd = [
                    'convert',
                    origFile,

                    // Fill in new space with white background
                    '-bordercolor white',
                    '-border ' + (width - expectedWidth) +
                      'x' + (height - expectedHeight),

                    // Anchor image to upper-left
                    '-gravity SouthEast',

                    // Specify new image size
                    '-crop ' + geometry,

                    // Specify the image location
                    expectedImg
                  ].join(' ');
              exec(cmd, cb);
            }
          ], getDiff);
        } else {
        // Otherwise, get the diff
          getDiff();
        }

        // TODO: I hate this file. Very un-reusable.
        function getDiff(err) {
          // If there was an error, callback with it
          if (err) { return cb(err); }

          // Otherwise, diff the images
          var diffCmd = [
                'compare',
                '-verbose',
                '-metric RMSE',
                '-highlight-color RED',
                '-compose Src',
                actualImg,
                expectedImg,
                diffImg
              ].join(' ');
          exec(diffCmd, processDiff);
        }
      });
    } else {
    // Otherwise, save the new image as the diff
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
      // console.log(result.stderr);
    });
    process.exit(1);
  } else {
  // Otherwise, exit gracefully
    console.log('All done!');
    process.exit(0);
  }
});