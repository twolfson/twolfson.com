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

  // Add a formatted date for each article
  var articles = jojoApp.articles;
  articles.forEach(function (article) {

  });

  // Render the index page and article pages
  var blogConfig = {page: 'blog'};
  app.get('/', function renderIndex (req, res) {
    console.log(res.render + '');
    res.render('index', blogConfig);
  });
  articles.forEach(function (article) {
    // app.get(article.url.replace(/\+/g, '-'), function renderArticle (req, res) {
    //   res.render('article', blogConfig);
    // });
  });
};