// Load in modules
global.assert = require('assert');
global.request = require('request');

// Set up config
global.config = {
  host: 'http://twolfson.com',
  url: function getUrl (path) {
    return this.host + path;
  }
};