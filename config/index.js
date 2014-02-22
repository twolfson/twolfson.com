// Load in dependencies
var Settings = require('shallow-settings');

// Define our settings
module.exports = new Settings({
  common: {
    inDevelopment: true,
    inProduction: false,
    'app.locals': {
      config: {
        author: 'Todd Wolfson',
        title: 'Todd Wolfson - Javascript Developer',
        url: 'http://twolfson.com/'
      }
    },
    mail: Settings.lazy(function () {
      return require('./mail');
    }),
    'support-me': {
      gittip: 'twolfson',
      flattr: 'twolfsn',
      paypal: {
        name: 'Todd Wolfson',
        email: 'todd@twolfson.com'
      },
      bitcoin: '1LVT8UpsgyKhGzN3TZxSKqqqd466NtZ99p',
      dogecoin: 'DGJQbYtSH8jau967XKUR7cpZ7jJEe9SPSQ'
    },
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
    mail: {
      host: 'localhost',
      port: 1338
    },
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
    inDevelopment: false,
    inProduction: true,
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
