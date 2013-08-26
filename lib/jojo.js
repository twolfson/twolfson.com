// Load in dependencies
var gfm = require('marked'),
    jojo = require('jojo');

// Export the app
module.exports = function (app) {
  // Create a jojo middleware
  var jojoApp = jojo({
    formatter: function (code) {
      return gfm.parse(code, {langPrefix: ''});
    },
    render: false
  });
  app.use(jojoApp);

  // Mark all blog pages as 'blog'
  app.get('/', function (req, res, next) {
    res.locals.page = 'blog';
  });

  // Add a formatted date for each article
  app.articles.
};