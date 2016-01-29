// Load in dependencies
var Settings = require('shallow-settings');
var numscale = require('numscale');
var articles = require('../articles');
var errorHandlers = require('./error-handlers');
var pkg = require('../package.json');
var staticConfig = require('./static');

// Define our settings
exports.getSettings = function (options) {
  // Load our settings
  var _settings = new Settings(staticConfig);
  var settings = _settings.getSettings(options);

  // Set up dynamic config
  settings.articles = articles;
  settings['app.locals'] = {
    config: settings.jojo,
    env: settings.ENV,
    numscale: numscale.scale
  };

  // Set up our error logger
  var errorHandler = settings.errorHandler;
  switch (errorHandler) {
    case 'console':
      settings.errorHandler = errorHandlers.console();
      break;
    case 'rollbar':
      var rollbarConfig = settings.rollbar;
      settings.errorHandler = errorHandlers.rollbar(rollbarConfig.serverToken, {
        environment: settings.ENV,
        revision: pkg.version
      });
      break;
    default:
      throw new Error('Expected `errorHandler` to be "console" or "production" but was "' + errorHandler);
  }

  // Complete and return our settings
  settings['package'] = pkg;
  return settings;
};
