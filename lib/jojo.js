// Load in dependencies
var marked = require('marked'),
    moment = require('moment'),
    jojo = require('jojo');

// Export the app
module.exports = function (app) {
  // Create a jojo middleware
  var jojoApp = jojo({
    formatter: function (code) {
      return marked.parse(code, {langPrefix: ''});
    },
    render: false
  });
  app.use(jojoApp);

  // Add a formatted date for each article
  var articles = jojoApp.articles;
  articles.forEach(function (article) {
    var date = article.date,
        dateStr = moment(date).format('MMMM DD, YYYY');
    article.dateStr = dateStr;
  });

  // Render the index page, article pages, and RSS
  var blogConfig = {page: 'blog'};
  app.get('/', function renderIndex (req, res) {
    res.render('index', blogConfig);
  });
  articles.forEach(function (article) {
    // TODO: Deal with Find++ as a route. Might need to resort to `next()` tactic
    app.get(article.url, function renderArticle (req, res) {
      res.render('article', blogConfig);
    });
  });
  app.get('/index.xml', function renderIndex (req, res) {
    res.render('xml', {layout: false});
  });
};