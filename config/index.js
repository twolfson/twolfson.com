// Load in dependencies
var _ = require('underscore');
var Settings = require('shallow-settings');
var numscale = require('numscale');
var errorLoggers = require('./error-loggers');
var pkg = require('../package.json');

// Union all of our settings
var errorConfig = require('./error');
var genericConfig = require('./generic');
var urlConfig = require('./url');

// Define our settings
exports.getSettings = function (options) {
  // Load
};

module.exports = new Settings({
  common: _.extend({}, urlConfig.common, {
    articles: Settings.lazy(function () {
      return require('../articles');
    }),
    'app.locals': Settings.lazy(function () {
      return {
        config: {
          author: 'Todd Wolfson',
          title: 'Todd Wolfson - Javascript Developer',
          url: 'http://twolfson.com/'
        },
        env: this.ENV,
        numscale: numscale.scale
      };
    }),
    // TODO: Bring me back via `errorLogger`
    // errorLogger: Settings.lazy(function () {
    //   return errorLoggers['console']();
    // }),
    // TODO: Bring me back via `secret`
    // mail: Settings.lazy(function () {
    //   return require('./secret').mail;
    // }),
    'package': pkg,
    'support-me': {
      bitcoin: '1LVT8UpsgyKhGzN3TZxSKqqqd466NtZ99p',
      dogecoin: 'DGJQbYtSH8jau967XKUR7cpZ7jJEe9SPSQ',
      flattr: 'twolfsn',
      gittip: 'twolfson',
      paypal: {
        name: 'Todd Wolfson',
        email: 'todd@twolfson.com'
      },
    }
  }),
  development: _.extend({}, urlConfig.development, {
    // Same as common
  }),
  test: _.extend({}, urlConfig.test, {
  }),
  production: _.extend({}, urlConfig.production, {
    // TODO: Bring me back via `errorLogger`
    // errorLogger: Settings.lazy(function () {
    //   var rollbarConfig = require('./secret').rollbar;
    //   return errorLoggers.rollbar(rollbarConfig.serverToken, {
    //     environment: this.ENV,
    //     revision: pkg.version
    //   });
    // }),
  })
});
