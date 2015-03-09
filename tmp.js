// Load in dependencies
var cheerio = require('cheerio');
var request = require('request');

// Make a request, normalize our HTML via Cheerio
request('http://localhost:8080/', function (err, res, body) {
  console.log(cheerio(body).html());
});
