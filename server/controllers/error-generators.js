var assert = require('assert');

exports.assertion = function (/*config*/) {
  return function (req, res) {
    assert.strictEqual('hello', 'world');
    res.send('No exception was raised');
  };
};
