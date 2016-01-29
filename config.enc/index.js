// Load in dependencies
var Settings = require('shallow-settings');
var numscale = require('numscale');
var articles = require('../articles');
var errorLoggers = require('./error-loggers');
// TODO: Relocate `secret` to be in `static`
// TODO: Verify using `articles` here doesn't break things...
var secret = require('./secret');
var staticConfig = require('./static');
var pkg = require('../package.json');

// Define our settings
exports.getSettings = function (options) {
  // Load our settings
  var _settings = new Settings(staticConfig);
  var settings = _settings.getSettings(options);

  // Set up dynamic config
  settings.articles = articles;
  settings['app.locals'] = {
    config: {
      author: 'Todd Wolfson',
      title: 'Todd Wolfson - Software Engineer',
      url: 'http://twolfson.com/'
    },
    env: settings.ENV,
    numscale: numscale.scale
  };

  // Set up our error logger
  var errorLogger = settings.errorLogger;
  switch (errorLogger) {
    case 'console':
      settings.errorLogger = errorLoggers.console();
      break;
    case 'rollbar':
      var rollbarConfig = secret.rollbar;
      settings.errorLogger = errorLoggers.rollbar(rollbarConfig.serverToken, {
        environment: settings.ENV,
        revision: pkg.version
      });
      break;
    default:
      throw new Error('Expected `errorLogger` to be "console" or "production" but was "' + errorLogger);
  }

  // If mail depends on secret info, load it
  if (settings.mail === 'secret') {
    settings.mail = secret.mail;
  }

  // Complete and return our settings
  settings['package'] = pkg;
  settings['support-me'] = {
    bitcoin: '1LVT8UpsgyKhGzN3TZxSKqqqd466NtZ99p',
    dogecoin: 'DGJQbYtSH8jau967XKUR7cpZ7jJEe9SPSQ',
    flattr: 'twolfsn',
    gratipay: 'twolfson',
    paypal: {
      name: 'Todd Wolfson',
      email: 'todd@twolfson.com'
    }
  };
  return settings;
};
