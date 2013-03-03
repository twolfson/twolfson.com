// Load in modules
var fs = require('fs');
global.fs = fs;
global.assert = require('assert');
global.request = require('request');

// Load in DOM specific modules
global.jsdom = require('jsdom');
var jqueryPath =  __dirname + '/test_files/jquery.js';
global.jqueryPath = jqueryPath;
global.jquerySrc = fs.readFileSync(jqueryPath, 'utf8');

// Set up config
var config = {
  host: 'http://twolfson.com',
  url: function getUrl (path) {
    return this.host + path;
  },
  navigateToRaw: function (options, cb) {
    // Collect arguments
    var args = [].slice.call(arguments);

    // If the options are a string
    if (typeof options === 'string') {
      options = config.url(options);
    } else {
      options.url = config.url(options.url);
    }

    // Call request
    console.log(options);
    var that = this;
    request(options, function getPage (err, res, body) {
      // Save response
      that.err = err;
      that.res = res;
      that.body = body;

      // Callback
      console.log(err, res);
      cb(err);
    });
  },
  navigateTo: function (options) {
    return function navFn (cb) {
      console.log(cb + '');
      return config.navigateToRaw.call(this, options, cb);
    };
  }
};
global.config = config;