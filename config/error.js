module.exports = {
  common: {
    errorLogger: 'console',
    throwCaughtErrors: false
  },
  development: {
    // Same as common
  },
  test: {
    throwCaughtErrors: true
  },
  production: {
    errorLogger: 'rollbar'
  }
};
