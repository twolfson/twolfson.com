// When an error occurs
function errorFn(msg, trace) {
  // Log the error and trace
  console.error(msg);
  trace.forEach(function(item) {
      console.error('  ', item.file, ':', item.line);
  });

  // Leave with a bad exit code
  phantom.exit(1);
}
phantom.onError = errorFn;

// Load in modules
var system = require('system'),
    webpage = require('webpage');

// Grab the arguments
var url = system.args[1],
    imgDest = system.args[2];

// If there is no url, throw an error
if (!url) {
  throw new Error('No url was specified.');
}

// if there is no image destination, throw an error
if (!imgDest) {
  throw new Error('No img destination was specified.');
}

// Load the compose webpage
var page = webpage.create();
page.onError = errorFn;
page.open(url, function (status) {
  // Screenshot the page
  page.render(imgDest);

  // Leave the program
  phantom.exit();
});
