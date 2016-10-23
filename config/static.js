// Load in our dependencies
var _ = require('underscore');
var package = require('../package.json');
var secret = require('./secret');

// Define generic unrelated settings
exports.common = {
  jojo: {
    author: 'Todd Wolfson',
    title: 'Todd Wolfson - Software Engineer',
    url: 'http://twolfson.com/'
  },
  // Resolve mail server based off of secret info
  // {user: 'email@emai.com', password: 'password', host: 'smtp.server', ssl: true}
  mail: secret.mail,
  // In development/testing, do not fetch new project info
  projectOptions: {
    updateImmediately: false,
    updateInterval: null
  },
  supportMe: {
    bitcoin: '1LVT8UpsgyKhGzN3TZxSKqqqd466NtZ99p',
    dogecoin: 'DGJQbYtSH8jau967XKUR7cpZ7jJEe9SPSQ',
    flattr: 'twolfsn',
    gratipay: 'twolfson',
    paypal: {
      name: 'Todd Wolfson',
      email: 'todd@twolfson.com'
    }
  },
  version: package.version
};

exports.development = {
  // Inherits from common
  sentry: {
    // TODO: Remove Sentry integration from development
    browserDSN: 'https://de513ad3694745dea7f421a1383703dd@sentry.io/108598'
  }
};

exports.test = {
  // In testing, use local mail server
  mail: {
    host: 'localhost',
    port: 1338
  },
  sentry: {
    browserDSN: null
  }
};

exports.production = {
  // Fetch project information every hour
  projectOptions: {
    updateImmediately: true,
    updateInterval: 1000 * 60 * 60 // 1 hour
  },
  rollbar: secret.rollbar,
  sentry: {
    browserDSN: 'https://de513ad3694745dea7f421a1383703dd@sentry.io/108598'
  }
};

// Merge in grouped settings
var configFiles = ['./static-error', './static-url'];
configFiles.forEach(function mergeConfigFile (configFile) {
  // Assert that the new config has no repeated keys
  var mainConfig = exports;
  var newConfig = require(configFile);
  var mainKeys = _.union(
    _.keys(mainConfig.common), _.keys(mainConfig.development),
    _.keys(mainConfig.test), _.keys(mainConfig.production)
  );
  var newKeys = _.union(
    _.keys(newConfig.common), _.keys(newConfig.development),
    _.keys(newConfig.test), _.keys(newConfig.production)
  );
  var sameKeys = _.intersection(mainKeys, newKeys);
  if (sameKeys.length > 0) {
    throw new Error('Duplicate keys found in multiple configs. Expected none. Found: ' + JSON.stringify(sameKeys));
  }

  // Add on the new properties
  _.extend(mainConfig.common, newConfig.common);
  _.extend(mainConfig.development, newConfig.development);
  _.extend(mainConfig.test, newConfig.test);
  _.extend(mainConfig.production, newConfig.production);
});
