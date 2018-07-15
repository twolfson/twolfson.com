// Load in dependencies
var assert = require('assert');

// Default page
exports.index = function (config) {
  return [
    function indexFn(req, res) {
      res.render('contact.jade');
    }
  ];
};
