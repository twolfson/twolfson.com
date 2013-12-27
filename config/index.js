// Set up constants
var env = process.env.NODE_ENV || 'development',
    inProduction = env === 'production';

// Export module
module.exports = {
  env: env,
  mail: require('./mail'),
  inProduction: inProduction,
  inDevelopment: !inProduction,
  'support-me': {
    gittip: 'twolfson',
    flattr: 'twolfson',
    paypal: 'todd@twolfson.com',
    bitcoin: 'TODO',
    dogecoin: 'DGJQbYtSH8jau967XKUR7cpZ7jJEe9SPSQ'
  }
};