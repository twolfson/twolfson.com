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
    render: false,
    author: "Todd Wolfson",
    title: "Todd Wolfson - Javascript Developer",
    url: "http://twolfson.com/"
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
  app.get('/', function renderIndex (req, res) {
    res.render('index', {page: 'blog', articles: articles});
  });
  articles.forEach(function (article) {
    // DEV: Escape '+' as express coerces URL to a regexp
    var url = article.url.replace(/\+/g, '\\+');
    app.get(url, function renderArticle (req, res) {
      res.render('article', {page: 'blog', article: article});
    });
  });
  app.get('/index.xml', function renderIndex (req, res) {
    res.render('xml', {layout: false});
  });
};