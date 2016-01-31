exports.common = {
  // Nothing shared across URLs
};

exports.development = {
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
};

exports.test = {
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
};

exports.production = {
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
};
