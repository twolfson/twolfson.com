// Catch-all for one-off configurations
module.exports = {
  common: {
    // Resolve mail server based off of secret info
    // {user: 'email@emai.com', password: 'password', host: 'smtp.server', ssl: true}
    mail: 'secret',
    // In development/testing, do not fetch new project info
    projectOptions: {
      updateImmediately: false,
      updateInterval: null
    }
  },
  development: {
    // Same as common
  },
  test: {
    // In testing, use local mail server
    mail: {
      host: 'localhost',
      port: 1338
    }
  },
  production: {
    // Fetch project information every hour
    projectOptions: {
      updateImmediately: true,
      updateInterval: 1000 * 60 * 60 // 1 hour
    }
  }
};
