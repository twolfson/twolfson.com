// Load in our dependencies
var async = require('async');
var request = require('request');
var serverUtils = require('../utils/server');

// Define all URLs we expected
/* eslint-disable indent */
var urlInfos = [
  '/2015-10-17-release-foundry-v4',
    {src: '/2015-10-17-release:-foundry-v4', target: '/2015-10-17-release-foundry-v4'},
  '/2015-08-06-minimizing-merge-conflicts',
  '/2015-07-31-slacks-source-code-is-beautiful',
  '/2015-06-03-learning-to-forget',
  '/2015-04-21-retina-sprites-are-here',
    {src: '/2015-04-21-retina-sprites-are-here!', target: '/2015-04-21-retina-sprites-are-here'},
  '/2015-02-06-automate-your-style',
  '/2015-01-11-testing-with-other-services',
  '/2014-11-22-moving-from-phantomjs-to-node-webkit',
  '/2014-11-05-welcome-back',
  '/2014-07-10-taking-a-break',
  '/2014-05-28-taken-for-granted-regression-tests',
    {src: '/2014-05-29-taken-for-granted-regression-tests', target: '/2014-05-28-taken-for-granted-regression-tests'},
    {src: '/2014-05-29-taken-for-granted:-regression-tests', target: '/2014-05-28-taken-for-granted-regression-tests'},
  '/2014-03-19-release-foundry',
    {src: '/2014-03-19-release:-foundry', target: '/2014-03-19-release-foundry'},
  '/2014-02-25-visual-regression-testing-in-travis-ci',
  '/2014-02-17-suggested-reading-for-writing-a-gulp-plugin',
  '/2014-01-19-low-tech-dependency-management-via-grunt-tasks',
  '/2013-12-26-release-sublime-plugin-tests',
    {src: '/2013-12-26-release:-sublime-plugin-tests', target: '/2013-12-26-release-sublime-plugin-tests'},
  '/2013-11-26-optimal-lines-again',
  '/2013-11-25-unlicense-all-the-things',
  '/2013-11-21-release-gifsockets',
    {src: '/2013-11-21-release:-gifsockets', target: '/2013-11-21-release-gifsockets'},
  '/2013-11-02-how-to-linkify-markdown-headers',
  '/2013-11-02-website-redesigned-and-refactored',
  '/2013-10-16-life-view-what-shapes-the-self',
    {src: '/2013-10-16-life-view:-what-shapes-the-self', target: '/2013-10-16-life-view-what-shapes-the-self'},
  '/2013-10-16-life-view-free-will',
    {src: '/2013-10-16-life-view:-free-will', target: '/2013-10-16-life-view-free-will'},
  '/2013-10-16-release-git-sqwish',
    {src: '/2013-10-16-release:-git-sqwish', target: '/2013-10-16-release-git-sqwish'},
  '/2013-09-24-debugging-osx-via-sauce-labs',
  '/2013-09-22-debugging-travis-ci',
  '/2013-09-08-optimal-line-length-theory',
  '/2013-08-15-readability-formalized',
    {src: '/2013-08-15-readability:-formalized', target: '/2013-08-15-readability-formalized'},
  '/2013-08-15-sexy-bash-prompt',
  '/2013-07-27-develop-faster',
  '/2013-07-24-abandoned-project-kaleidoscope',
    {src: '/2013-07-24-abandoned-project:-kaleidoscope', target: '/2013-07-24-abandoned-project-kaleidoscope'},
  '/2013-07-11-axioms-of-maintainability',
  '/2013-07-06-a-better-shell',
  '/2013-07-04-finding-the-perfect-mix-of-code-coverage',
  '/2013-05-27-bringing-vertical-rhythm-to-code',
  '/2013-05-27-bdd-and-the-future',
  '/2013-04-22-why-i-open-source',
  '/2013-04-22-phantomjs-engine-for-spritesmith',
  '/2013-04-22-introducing-find-plus-plus',
    {src: '/2013-04-22-introducing-find++', target: '/2013-04-22-introducing-find-plus-plus'},
  '/2013-03-17-halo-a-modular-mvc',
    {src: '/2013-03-17-halo---a-modular-mvc', target: '/2013-03-17-halo-a-modular-mvc'},
  '/2013-03-11-builder-build-chain-for-your-client-side',
    {
      src: '/2013-03-11-builder---build-chain-for-your-client-side',
      target: '/2013-03-11-builder-build-chain-for-your-client-side'
    },
  '/2013-03-11-spritesheets-and-variables-made-easy',
  '/2013-02-15-open-letter-to-gruntjs',
  '/2012-11-17-subtle-anti-patterns',
  '/2012-11-14-node-knockout-2012',
  '/2012-10-07-jsmin-with-sourcemaps',
  '/2012-09-09-bdd-pipe-dreams',
  '/2012-07-04-why-your-client-side-framework-deserves-a-build-chain',
  '/2012-06-16-open-sourced-website-and-css-off',
  '/2012-06-11-introducing-jojo',
  '/2012-03-25-catch-up-css-off',
    {src: '/2012-03-25-catch-up---css-off', target: '/2012-03-25-catch-up-css-off'},
  '/2012-03-25-hands-free-refresh-anywhere-file-watcher-et-al',
    {
      src: '/2012-03-25-hands-free-refresh-anywhere---file-watcher-et-al.',
      target: '/2012-03-25-hands-free-refresh-anywhere-file-watcher-et-al'
    },
  '/2012-03-16-catching-up-to-date',
  '/2012-02-21-blog-launch',
    {src: '/2012-02-21-blog-launch!', target: '/2012-02-21-blog-launch'}
];
/* eslint-enable indent */

// For each of our URLs, verify it's a valid target
// DEV: This was initially written as a one-off script -- hence the poor structure and bundling
describe('When requesting each of our legacy URLs', function () {
  serverUtils.run();
  before(function requestUrls(done) {
    var that = this;
    // DEV: Increase timeout to 10s for slow servers
    this.timeout(10000);
    async.map(urlInfos, function requestUrl(urlInfo, cb) {
      var urlPathname = typeof urlInfo === 'object' ? urlInfo.src : urlInfo;
      var url = serverUtils.getUrl(urlPathname);
      request({
        url: url,
        // TODO: When we finish this, we might need redirect: true
        followRedirect: false,
        expectedStatusCode: null
      }, function handleResponse(err, res, body) {
        // Callback with the error and response
        return cb(err, res);
      });
    }, function saveResponses(err, resArr) {
      that.resArr = resArr;
      done(err);
    });
  });
  after(function cleanup() {
    delete this.resArr;
  });

  it('renders/redirects to the expected location', function () {
    // For each of our responses
    var errs = [];
    this.resArr.forEach(function processRes(res, i) {
      // If the info is a string, verify it was a direct hit
      var urlInfo = urlInfos[i];
      var urlPathname;
      if (typeof urlInfo === 'string') {
        urlPathname = urlInfo;
        if (res.statusCode !== 200) {
          errs.push('Expected 200 status code for "' + urlPathname + '" but received "' + res.statusCode + '"');
        }
      // Otherwise, verify it was a 301 to the expected location
      } else {
        urlPathname = urlInfo.src;
        if (res.statusCode !== 301) {
          errs.push('Expected 301 status code for "' + urlPathname + '" but received "' + res.statusCode + '"');
        }

        var actualLocation = res.headers.location;
        if (actualLocation !== urlInfo.target) {
          errs.push('Expected "' + urlPathname + '" to redirect to "' + urlInfo.target + '" ' +
            'but it redirected to "' + actualLocation + '"');
        }
      }
    });

    // If we have errors, concatenate them
    if (errs.length) {
      throw new Error(errs.join('\n'));
    }
  });
});
