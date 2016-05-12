// When we run into an uncaught exception, fail hard
// DEV: Without this line, Electron can hang indefinitely
process.on('uncaughtException', function handleUncaughtException (err) {
  throw err;
});

// Load in dependencies
var assert = require('assert');
var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var fs = require('fs');
var cssControls = require('css-controls');

// Grab the arguments
var url = process.argv[2];
var imgDest = process.argv[3];

// Assert against url and image destination
assert(url, 'No url was specified.');
assert(imgDest, 'No img destination was specified.');

// When Electron is done loading, launch our application
app.on('ready', function handleReady () {
  var browserWindow = new BrowserWindow({
    // TODO: Update browser dimensions
    width: 1024,
    height: 800
  });
  browserWindow.loadURL(url);
});

// // When all the assets load (e.g. images, CSS, JS)
// win.on('loaded', function handleLoad () {
//   // Calculate how of the much window dimensions are padding
//   var viewportWidth = Math.max(
//     win.window.document.documentElement.clientWidth,
//     win.window.innerWidth || 0);
//   var viewportHeight = Math.max(
//     win.window.document.documentElement.clientHeight,
//     win.window.innerHeight || 0);
//   var paddingWidth = guiWidth - viewportWidth;
//   var paddingHeight = guiHeight - viewportHeight;

//   // Resize to full content height/width
//   win.resizeTo(
//     win.window.document.body.scrollWidth + paddingWidth,
//     win.window.document.body.scrollHeight + paddingHeight);

//   // Wait for resize to take effect
//   // TODO: Place me on an async loop `async.until`
//   setTimeout(function waitForResize () {
//     // Hide all <canvas> elements
//     // DEV: develop-faster has timer based draws so there can be issues
//     // http://www.quirksmode.org/dom/w3c_css.html
//     cssControls.addRule(win.window.document.styleSheets[1], 'canvas', 'display: none;');

//     // Wait for page to stabilize/load elements
//     setTimeout(function waitForStabilization () {
//       // Render and exit
//       win.capturePage(function handleScreenshot (buff) {
//         // Write our our image and leave
//         fs.writeFile(imgDest, buff, function handleSave (err) {
//           win.close();
//           process.exit();
//         });
//       }, {format: 'png', datatype: 'buffer'});
//     }, 1000);
//   }, 100);
// });
