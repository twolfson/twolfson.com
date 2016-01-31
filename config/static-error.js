exports.common = {
  errorHandler: 'console',
  // By default, log all caught errors
  throwCaughtErrors: false
};

exports.development = {
  // Inherits from common
};

exports.test = {
  // In tests, throw caught errors
  throwCaughtErrors: true
};

exports.production = {
  errorHandler: 'rollbar'
};
