var _ = require('underscore');
var request = require('request');

// Bind `request-mocha` to `exports`
_.extend(exports, require('request-mocha')(request));
