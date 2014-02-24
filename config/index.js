// Load in dependencies
var numscale = require('numscale');
var Settings = require('shallow-settings');
var errorLoggers = require('./error-loggers');
var pkg = require('../package.json');

// Define our settings
module.exports = new Settings({
  common: {
    addDevelopmentRoutes: true,
    addTestRoutes: true,
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
    errorLogger: Settings.lazy(function () {
      return errorLoggers['console']();
    }),
    mail: Settings.lazy(function () {
      return require('./secret').mail;
    }),
    'package': pkg,
    projectOptions: {
      updateImmediately: false,
      updateInterval: null
    },
    'support-me': {
      bitcoin: '1LVT8UpsgyKhGzN3TZxSKqqqd466NtZ99p',
      dogecoin: 'DGJQbYtSH8jau967XKUR7cpZ7jJEe9SPSQ',
      flattr: 'twolfsn',
      gittip: 'twolfson',
      paypal: {
        name: 'Todd Wolfson',
        email: 'todd@twolfson.com'
      },
    },
    throwCaughtErrors: false,
    url: {
      internal: {
        protocol: 'http',
        hostname: 'localhost',
        port: 8080
      },
      external: {
        protocol: 'http',
        hostname: 'localhost',
        port: 8080
      }
    }
  },
  development: {
    // Same as common
  },
  test: {
    addDevelopmentRoutes: false,
    addTestRoutes: true,
    mail: {
      host: 'localhost',
      port: 1338
    },
    throwCaughtErrors: true,
    url: {
      internal: {
        protocol: 'http',
        hostname: 'localhost',
        port: 1337
      },
      external: {
        protocol: 'http',
        hostname: 'twolfson.test',
        port: 1337
      }
    }
  },
  production: {
    addDevelopmentRoutes: false,
    addTestRoutes: false,
    errorLogger: Settings.lazy(function () {
      var rollbarConfig = require('./secret').rollbar;
      return errorLoggers.rollbar(rollbarConfig.serverToken, {
        environment: this.ENV,
        revision: pkg.version
      });
    }),
    projectOptions: {
      updateImmediately: true,
      updateInterval: 1000 * 60 * 60 // 1 hour
    },
    url: {
      internal: {
        protocol: 'http',
        hostname: 'localhost',
        port: 8080
      },
      external: {
        protocol: 'http',
        hostname: 'twolfson.com'
      }
    }
  }
});
