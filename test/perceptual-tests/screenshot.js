// When an error occurs
phantom.onError = function (msg, trace) {
  // Log the error and trace
  console.error(msg);
  trace.forEach(function(item) {
      console.error('  ', item.file, ':', item.line);
  });

  // Leave with a bad exit code
  phantom.exit(1);
};

// Load in modules
var system = require('system'),
    webpage = require('webpage');

// Grab the arguments
var url = system.args[1];

// If there is no image, throw an error
if (!url) {
  throw new Error('No url was specified.');
}

// Load the compose webpage
var page = webpage.create();
// page.open(url, function (status) {
//   console.log('hi');

  // Leave the program
  phantom.exit();
// });
