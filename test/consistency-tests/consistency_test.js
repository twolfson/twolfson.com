// Load in our dependencies
var assert = require('assert');
var assertDiff = require('assert-diff');
var fs = require('fs');
var beautify = require('html').prettyPrint;
var minify = require('html-minifier').minify;
var httpUtils = require('../utils/http');
var serverUtils = require('../utils/server');

// Load in our target URLs
var urls = [
  // `urls.yml`
  '/',
  '/2012-11-17-subtle-anti-patterns',
  '/2013-07-11-axioms-of-maintainability # Blog post with code highlighting',
  '/2013-07-24-abandoned-project:-kaleidoscope # Blog post with images',
  '/2013-07-27-develop-faster # Blog post with tables',
  '/2013-08-15-sexy-bash-prompt # Top blog post which can relate to itself',
  '/2012-03-25-catch-up---css-off # Related project that is a competition (no description on projects page but on article)',
  '/projects',
  '/contact',
  '/contact/success',
  '/contact/failure',
  '/404',
  '/500',
  '/license',
  '/support-me',

  // Custom extras
  '/index.xml',
  '/kaleido'
];

function normalize(body) {
  var minHtml = minify(body, {
    collapseWhitespace: true
  });
  var beautyHtml = beautify(minHtml);
  return beautyHtml;
}

// Start our tests
describe('A request to', function () {
  serverUtils.run();

  urls.forEach(function testUrl (url) {
    describe(url, function () {
      httpUtils.save(serverUtils.getUrl(url));

      it('has expected content', function () {
        assert.strictEqual(this.err, null);
        var actualContent = this.body;

        // If we are in a test environment, output the file
        if (process.env.TEST_DEBUG) {
          fs.writeFileSync(__dirname + '/test_files/' + encodeURIComponent(url) + '.html', actualContent, 'utf8');
        }

        // Otherwise, normalize expected/actual and compare
        var expectedContent = fs.readFileSync(__dirname + '/test_files/' + encodeURIComponent(url) + '.html', 'utf8');
        var prettyActualContent = normalize(actualContent);
        var prettyExpectedContent = normalize(expectedContent);

        // TODO: Move to a better diff mechanism
        assertDiff.strictEqual(prettyExpectedContent, prettyActualContent);
      });
    });
  });
});
