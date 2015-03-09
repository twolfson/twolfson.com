// Load in dependencies
var minify = require('html-minifier').minify;
var request = require('request');

// Make a request, normalize our HTML via Cheerio
request('http://localhost:8080/', function (err, res, body) {
  // If there is an error, throw it
  if (err) {
    throw err;
  }

  // Otherwise, minify then beautify our HTML
  var minHtml = minify(body, {
    collapseWhitespace: true
  });
  console.log(minHtml);
});
