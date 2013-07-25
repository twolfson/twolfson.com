// Set up common variables
var expectedScreenshots = __dirname + '/expected_screenshots',
    actualScreenshots = __dirname + '/actual_screenshots',
    screenshotDiffs = __dirname + '/screenshot_diffs';

// Set up unabstracted variables
// TODO: Move browsers, urls into standalone files
// TODO: See notes in https://gist.github.com/twolfson/6077989
var browsers = ['phantomjs'],
    baseUrl = 'http://localhost:8080/',
    urls = [
      '/',
      '/2012-11-17-subtle-anti-patterns',
      '/projects',
      '/contact',
      '/contact?test=success',
      '/contact?test=fail',
      '/404'
    ];

// For each of the URLs
urls.forEach(function () {
  // TODO: mocha-ify this
  // TODO: Screenshot the webpage
  // TODO: Get a diff of the image (write it to screenshot_diffs either in memory or from the script)
  // TODO: Assert the diff is empty
});