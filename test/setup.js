// Load in modules
global.assert = require('assert');
global.request = require('request');
global.jsdom = require('jsdom');

// Set up config
var config = global.config = {
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
    var that = this;
    request(options, function getPage (err, res, body) {
      // Save response
      that.err = err;
      that.res = res;
      that.body = body;

      // Callback
      cb(err);
    });
  },
  navigateTo: function (options) {
    return function navFn (cb) {
      return config.navigateToRaw.call(this, options, cb);
    };
  }
};