// Load in dependencies
var Settings = require('shallow-settings');
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
  // TODO: Load articles directly in server
  settings.articles = articles;

  // Set up our error logger
  // TODO: Configure error handler in server, not in config
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
  // TODO: Remove redundant `package` as we already have version
  settings['package'] = pkg;
  return settings;
};
