module.exports = {
  common: {
    errorLogger: 'console',
    // By default, log all caught errors
    throwCaughtErrors: false
  },
  development: {
    // Same as common
  },
  test: {
    // In tests, throw caught errors
    throwCaughtErrors: true
  },
  production: {
    errorLogger: 'rollbar'
  }
};
