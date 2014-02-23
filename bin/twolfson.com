#!/usr/bin/env node

// Load in dependencies
var assert = require('assert');
var url = require('url');
var Server = require('../');

// Set up CLI parser
var program = require('commander');
program.name = 'twolfson.com';
program
  .option('-e, --environment <environment>', 'Environment to run application as', process.env.NODE_ENV)
  .parse(process.argv);

// Assert that we were not passed common as a node env
var env =  program.environment || 'development';
assert.notEqual(env, 'common', '"common" is not a valid environment');

// Load our settings and start the server
var settings = require('../config').getSettings({env: env});
var server = new Server(settings);
server.listen();

// Notify the user that the server is running
var serverUrl = url.format(settings.url.external) + '/';
console.log('Server running at ' + serverUrl);
