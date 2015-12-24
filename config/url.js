module.exports = {
  common: {
    addDevelopmentRoutes: true,
    addTestRoutes: true,
    url: {
      listeningHostname: '127.0.0.1',
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
    url: {
      listeningHostname: '127.0.0.1',
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
    url: {
      listeningHostname: '127.0.0.1',
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
};
