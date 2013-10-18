// Set up constants
var env = process.env.NODE_ENV,
    inProduction = env === 'production';

// Export module
module.exports = {
  env: env,
  mail: require('./mail'),
  inProduction: inProduction,
  inDevelopment: !inProduction
};