// TODO: When an error occurs, log it and exit
// process.on('uncaughtException', function handleErr (err) {
//   process.exit(1);
// });

// Load in dependencies
var assert = require('assert');
var app = require('app');
var fs = require('fs');
var BrowserWindow = require('browser-window');

// Grab the arguments
var url = process.argv[2];
var imgDest = process.argv[3];

// Assert against url and image destination
assert(url, 'No url was specified.');
assert(imgDest, 'No img destination was specified.');

// When the app is ready
app.on('ready', function onready () {
  // Open our browser in an invisible window
  // https://github.com/atom/atom-shell/blob/v0.17.2/docs/api/browser-window.md
  var win = new BrowserWindow({
    width: null,
    height: null,
    show: false,
    // TODO: This changes between versions
    // TODO: Does the domready error cause different renderings?
    'node-integration': 'disable',
    'enable-larger-than-screen': true
  });
  win.loadUrl(url);

  // When it loads, screenshot it
  win.webContents.on('did-finish-load', function () {
    // Wait for a bit
    setTimeout(function waitForCanvasesToLoad () {
      // // TODO: Remove all canvas elements
      // win.evaluate(function () {
      //   var $canvases = document.getElementsByTagName('canvas');
      //   [].forEach.call($canvases, function ($canvas) {
      //     $canvas.parentNode.removeChild($canvas);
      //   });
      // });

      // Adjust the browser size to encompass the whole page
      // TODO: Can't figure out how to get this context without injecting a script into the browser context
      // TODO: Unless we upgrade to a version `preload` but then we have lost our rendering =(
      console.log(win.getSize(), win.getContentSize());
      win.webContents.executeJavaScript('console.log(typeof require);');
      console.log(win.webContents);

      // Render and exit
      win.capturePage(function handleCapture (img) {
        fs.writeFileSync(imgDest, img);
        process.exit();
      });
    }, 1000);
  });
});

