// When an error occurs, log it and exit
process.on('uncaughtException', function handleErr (err) {
  console.error(err);
  process.exit(1);
});

// Load in dependencies
var assert = require('assert');
var fs = require('fs');
var gui = require('nw.gui');
var path = require('path');

// Grab the arguments
var url = gui.App.argv[0];
var imgDest = gui.App.argv[1];

// Assert against url and image destination
assert(url, 'No url was specified.');
assert(imgDest, 'No img destination was specified.');

// Navigate to a website in a new window
// DEV: Otherwise, we lose our script after navigating
var guiWidth = 800;
var guiHeight = 600;
// var win = gui.Window.open('http://google.com/', {
var win = gui.Window.open(url, {
  width: guiWidth,
  height: guiHeight,
  toolbar: false,
  frame: false
});

// When all the assets load (e.g. images, CSS, JS)
win.on('loaded', function handleLoad () {
  // Calculate how of the much window dimensions are padding
  var viewportWidth = Math.max(
    win.window.document.documentElement.clientWidth,
    win.window.innerWidth || 0);
  var viewportHeight = Math.max(
    win.window.document.documentElement.clientHeight,
    win.window.innerHeight || 0);
  var paddingWidth = guiWidth - viewportWidth;
  var paddingHeight = guiHeight - viewportHeight;

  // Resize to full content height/width
  win.resizeTo(
    win.window.document.body.scrollWidth + paddingWidth,
    win.window.document.body.scrollHeight + paddingHeight);

  // Wait for resize to take effect
  // TODO: Place me on an async loop `async.until`
  setTimeout(function waitForResize () {
    // Wait for a bit longer
    setTimeout(function waitForCanvasesToLoad () {
      // Remove all canvas elements
      var $canvases = win.window.document.getElementsByTagName('canvas');
      [].forEach.call($canvases, function ($canvas) {
        $canvas.parentNode.removeChild($canvas);
      });

        // Render and exit
        win.capturePage(function handleScreenshot (buff) {
          // If there is no existing directory create one
          try {
            fs.mkdirSync(path.dirname(imgDest));
          } catch (err) {
            if (err.code !== 'EEXIST') {
              return done(err);
            }
          }

          // Write our our image and leave
          fs.writeFile(imgDest + i + '.png', buff, function handleSave (err) {
            win.close();
            done(err);
          });
        }, {format: 'png', datatype: 'buffer'});
      }, 1000);
    }, 100);
  });
}, function allDone () {
  process.exit();
});
