// Create the server
var express = require('express'),
		app = express(),
    config = require('../config');

// Set up view engine and static files for pages
app.engine('ejs', require('ejs'));
app.use('/public', express['static'](__dirname + '/../dist'));
app.use('/public', express['static'](__dirname + '/../public'));

// If we are in dev, allow static hosting of tests folder
if (config.inDevelopment) {
  app.use('/test', express['static'](__dirname + '/test'));
}

// // Set up jojo pages
// var addJojo = require('./jojo');
// addJojo(app);

// Configure routes
var addRoutes = require('./routes2');
addRoutes(app);

var routes = require('./routes');
app.get('/projects', routes.projects);

// If the page is not found, throw an error and redirect to the 404 page
app.all('*', function (req, res) {
  res.render('404', {'status': 404, 'page': '404'});
});

// Begin listening for requests
app.listen(8080);
console.log("Server running at http://127.0.0.1:8080/");