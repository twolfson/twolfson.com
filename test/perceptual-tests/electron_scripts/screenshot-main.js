// When we run into an uncaught exception, fail hard
// DEV: Without this line, Electron can hang indefinitely
process.on('uncaughtException', function handleUncaughtException (err) {
  throw err;
});

// Load in dependencies
var assert = require('assert');
var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var ipcMain = require('electron').ipcMain;
var fs = require('fs');

// Grab the arguments
var url = process.argv[2];
var imgDest = process.argv[3];

// Assert against url and image destination
assert(url, 'No url was specified.');
assert(imgDest, 'No img destination was specified.');

// When Electron is done loading, launch our application
app.on('ready', function handleReady () {
  // Create a browser and load our window
  var browserWindow = new BrowserWindow({
    // Set super high height but Electron trims down to size =)
    width: 1024,
    height: 20000,
    enableLargerThanScreen: true,
    webPreferences: {
      preload: __dirname + '/screenshot-renderer.js',
      nodeIntegration: false
    }
  });
  browserWindow.loadURL(url);

  // When the window is done loading, screenshot our page and exit
  ipcMain.on('renderer:load', function handleLoad () {
    // Wait 1 second for fonts to load (not sync for `onload`)
    setTimeout(function handleSetTimeout () {
      browserWindow.capturePage(function handleCapturePage (nativeImage) {
        // Write out our image
        fs.writeFileSync(imgDest, nativeImage.toPng());

        // Exit our process
        process.exit(0);
      });
    }, 1000);
  });
});
