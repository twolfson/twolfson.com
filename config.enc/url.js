exports.common = {
  // TODO: Relocate all of this into `development`
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

exports.development = {
  // Inherits from common
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
