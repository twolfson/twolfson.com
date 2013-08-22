// Set up constants
var NODE_ENV = process.env.NODE_ENV,
    inProduction = NODE_ENV === 'production';

// Export module
module.exports = {
  inProduction: inProduction,
  inDevelopment: !inProduction
};