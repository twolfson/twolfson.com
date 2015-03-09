// Load in dependencies
var htmlparser2 = require('htmlparser2');
var request = require('request');

// Make a request, normalize our HTML via Cheerio
request('http://localhost:8080/', function (err, res, body) {
  // If there is an error, throw it
  if (err) {
    throw err;
  }

  // Otherwise, coerce our data
  var dom = htmlparser2.parseDOM(body);
  var node = dom[0];
  while (node) {
    console.log('node', node);
    node = node.next;
  }
});
