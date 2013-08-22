// Create the server
var express = require('express'),
		app = express.createServer(),
    config = require('./lib/config');

// Set up view engine and static files for pages
app.set('view engine', 'ejs');
app.use('/public', express['static'](__dirname + '/dist'));
app.use('/public', express['static'](__dirname + '/public'));

// If we are in dev, allow static hosting of tests folder
if (config.inDevelopment) {
  app.use('/test', express['static'](__dirname + '/test'));
}

// Set up jojo pages
var addJojo = require('./lib/jojo');
addJojo(app);

// DEV: Stopping tracking of this since it bloats analytics
// // If we are in a production environment, track whenever an RSS is requested
// if (inProduction) {
//  var GA = require('./ga'),
//      ga = GA();
//   app.get('/index.xml', ga);
// }

// Configure routes
var addRoutes = require('./lib/routes');
addRoutes(app);

// Begin listening for requests
app.listen(8080);
console.log("Server running at http://127.0.0.1:8080/");