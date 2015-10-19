// Load in our dependencies
var async = require('async');
var request = require('request');

// Define all URLs we expected
var urlInfos = [
  {src: '/2015-10-17-release:-foundry-v4', target: '/2015-10-17-release-foundry-v4'},
  '/2015-08-06-minimizing-merge-conflicts',
  '/2015-07-31-slacks-source-code-is-beautiful',
  '/2015-06-03-learning-to-forget',
  // Verify `retina-sprites-are-here`
  '/2015-04-21-retina-sprites-are-here!',
  '/2015-02-06-automate-your-style',
  '/2015-01-11-testing-with-other-services',
  '/2014-11-22-moving-from-phantomjs-to-node-webkit',
  '/2014-11-05-welcome-back',
  '/2014-07-10-taking-a-break',
  '/2014-05-29-taken-for-granted:-regression-tests',
  // Verify `release-founry`
  '/2014-03-19-release:-foundry',
  '/2014-02-25-visual-regression-testing-in-travis-ci',
  '/2014-02-17-suggested-reading-for-writing-a-gulp-plugin',
  '/2014-01-19-low-tech-dependency-management-via-grunt-tasks',
  // Verify `release-...`
  '/2013-12-26-release:-sublime-plugin-tests',
  '/2013-11-26-optimal-lines-again',
  '/2013-11-25-unlicense-all-the-things',
  // Verify `release-...`
  '/2013-11-21-release:-gifsockets',
  '/2013-11-02-how-to-linkify-markdown-headers',
  '/2013-11-02-website-redesigned-and-refactored',
  // Verify `life-view-...`
  '/2013-10-16-life-view:-what-shapes-the-self',
  // Verify `life-view-...`
  '/2013-10-16-life-view:-free-will',
  // Verify `release-...`
  '/2013-10-16-release:-git-sqwish',
  '/2013-09-24-debugging-osx-via-sauce-labs',
  '/2013-09-22-debugging-travis-ci',
  // Verify `readability-...`
  '/2013-09-08-optimal-line-length-theory',
  '/2013-08-15-readability:-formalized',
  '/2013-08-15-sexy-bash-prompt',
  '/2013-07-27-develop-faster',
  // Verify `abandoned-project-...`
  '/2013-07-24-abandoned-project:-kaleidoscope',
  '/2013-07-11-axioms-of-maintainability',
  '/2013-07-06-a-better-shell',
  '/2013-07-04-finding-the-perfect-mix-of-code-coverage',
  '/2013-05-27-bringing-vertical-rhythm-to-code',
  '/2013-05-27-bdd-and-the-future',
  '/2013-04-22-why-i-open-source',
  '/2013-04-22-phantomjs-engine-for-spritesmith',
  // Verify `introducing-find-plus-plus`
  '/2013-04-22-introducing-find\+\+',
  // Verify `halo-a-modular-mvc`
  '/2013-03-17-halo---a-modular-mvc',
  // Verify `builder-build-chain-for-...`
  '/2013-03-11-builder---build-chain-for-your-client-side',
  '/2013-03-11-spritesheets-and-variables-made-easy',
  '/2013-02-15-open-letter-to-gruntjs',
  '/2012-11-17-subtle-anti-patterns',
  '/2012-11-14-node-knockout-2012',
  '/2012-10-07-jsmin-with-sourcemaps',
  '/2012-09-09-bdd-pipe-dreams',
  '/2012-07-04-why-your-client-side-framework-deserves-a-build-chain',
  '/2012-06-16-open-sourced-website-and-css-off',
  '/2012-06-11-introducing-jojo',
  // Verify `catch-up-css-off`
  '/2012-03-25-catch-up---css-off',
  // Verify `hands-free-refresh-anywhere-file-watcher-et-al`
  '/2012-03-25-hands-free-refresh-anywhere---file-watcher-et-al.',
  '/2012-03-16-catching-up-to-date',
  // Verify `blog-launch`
  '/2012-02-21-blog-launch!'
];

// For each of our URLs, verify it's a valid target
async.map(urlInfos, function requestUrl (urlInfo, cb) {
  var urlPathname = typeof urlInfo === 'object' ? urlInfo.src : urlInfo;
  var url = 'http://localhost:8080' + urlPathname;
  request({
    url: url,
    // TODO: When we finish this, we might need redirect: true
    followRedirect: false
  }, function handleResponse (err, res, body) {
    // Callback with the error and response
    return cb(err, res);
  });
}, function handleResponses (err, resArr) {
  // If there was an error, throw it
  if (err) {
    throw err;
  }

  // For each of our responses
  resArr.forEach(function processRes (res, i) {
    // If the info is a string, verify it was a direct hit
    var urlInfo = urlInfos[i];
    var urlPathname;
    if (typeof urlInfo === 'string') {
      urlPathname = urlInfo;
      if (res.statusCode !== 200) {
        console.error('Expected 200 status code for "' + urlPathname + '" but received "' + res.statusCode + '"');
      }
    // Otherwise, verify it was a 301 to the expected location
    } else {
      urlPathname = urlInfo.src;
      if (res.statusCode !== 301) {
        console.error('Expected 301 status code for "' + urlPathname + '" but received "' + res.statusCode + '"');
        return;
      }

      var actualLocation = res.headers.location;
      if (actualLocation !== urlInfo.target) {
        console.error('Expected "' + urlPathname + '" to redirect to "' + urlInfo.target +
          ' but it redirected to ' + actualLocation + '"');
        return;
      }
    }
  });
});
