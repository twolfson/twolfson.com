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
  var articles = app.articles,
      blogPage = function (req, res, next) {
        res.locals.page = 'blog';
        next();
      };
  app.get('/', blogPage);
  articles.forEach(function (article) {
    app.get(article.url, blogPage);
  });

  // Add a formatted date for each article
  articles.forEach(function (article) {

  });

  // Render the index page and article pages
  app.get('/', function (req, res) {

  });
  articles.forEach(function (article) {
    app.get(article.url, blogPage);
  });
};