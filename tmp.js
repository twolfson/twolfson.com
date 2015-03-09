// Load in dependencies
var beautify = require('html').prettyPrint;
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
  var beautyHtml = beautify(minHtml);
  console.log(beautyHtml);
});
