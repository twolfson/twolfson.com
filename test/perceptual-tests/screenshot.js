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

// Create helper function to retry
function retry(fn, times, cb) {
  var i = 0;
  function retryFn() {
    if (fn()) {
      cb();
    } else if (i > times) {
      cb(new Error('Retry exceeded ' + times));
    } else {
      i += 1;
      setTimeout(retryFn, 100);
    }
  }
  retryFn();
}

// Load the compose webpage
var page = webpage.create();
page.onError = errorFn;
page.open(url, function (status) {
  // If the status is bad, throw an error
  if (status !== 'success') {
    throw new Error('"' + url + '" opened with bad status: "' + status + '"');
  }

  // Wait for render to work
  retry(function renderPage () {
    // Determine if there are screencasts and they have loaded
    var screencastsLoaded = page.evaluate(function () {
      // Get the screencasts
      var $screencasts = document.getElementsByClassName('screencast');

      // If there are none, return
      return $screencasts.length;
      if ($screencasts.length === 0) {
        return true;
      }

      // Otherwise, verify each has children
      [].all.call($screencasts, function ($screencast) {
        return $screencast.childNodes.length;
      });
    });

    // If there are and they have not, wait
    console.log(screencastsLoaded);
    if (!screencastsLoaded) {
      return false;
    }

    // Otherwise, attempt to render
    return page.render(imgDest);
  }, 10, function handleError (err) {
    // If there was an error, throw it
    if (err) {
      throw err;
    }

    // Leave the program
    phantom.exit();
  });
});
