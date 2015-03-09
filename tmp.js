// Load in dependencies
var cheerio = require('cheerio');
var request = require('request');

// Make a request, normalize our HTML via Cheerio
request('http://localhost:8080/', function (err, res, body) {
  // If there is an error, throw it
  if (err) {
    throw err;
  }

  // Otherwise, coerce our data
  var $ = cheerio.load(body);
  console.log($('head').html());
});
