// Load in our dependencies
var ipcRenderer = require('electron').ipcRenderer;
var cssControls = require('css-controls');

// When all DOM content is loaded
window.addEventListener('DOMContentLoaded', function handleDOMContentLoaded () {
  // Hide all <canvas> elements
  // DEV: develop-faster has timer based draws so there can be issues
  // http://www.quirksmode.org/dom/w3c_css.html
  cssControls.addRule(window.document.styleSheets[1], 'canvas', 'display: none;');
});

// When all browser content loads (e.g. images, CSS, JS)
window.addEventListener('load', function handleLoad () {
  // Notify IPC we are loaded
  ipcRenderer.send('renderer:load');
});
