// Create the server
var express = require('express'),
		app = express.createServer(),
    config = require('../config');

// Set up view engine and static files for pages
app.set('view engine', 'ejs');
app.use('/public', express['static'](__dirname + '/../dist'));
app.use('/public', express['static'](__dirname + '/../public'));

// If we are in dev, allow static hosting of tests folder
if (config.inDevelopment) {
  app.use('/test', express['static'](__dirname + '/test'));
}

// Set up jojo pages
var addJojo = require('./jojo');
addJojo(app);

// Configure routes
var addRoutes = require('./routes');
addRoutes(app);

// Begin listening for requests
app.listen(8080);
console.log("Server running at http://127.0.0.1:8080/");