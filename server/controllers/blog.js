// Load and convert activity
// TODO: Relocate jade into views
var fs = require('fs');
var jade = require('jade');
var activityJade = fs.readFileSync(__dirname + '/blog_activity.jade', 'utf8');
var activityHtml = jade.render(activityJade);

// Render homepage
exports.index = function (config) {
  var articles = config.articles;
  return [
    function renderIndex (req, res) {
      res.render('index.jade', {
        page: 'blog',
        articles: articles,
        activity: activityHtml,
        title: 'Todd Wolfson - Blog',
        seoKeywords: 'Todd Wolfson, twolfson, twolfsn, blog, javascript, web dev',
        seoDescription: 'Blog about JavaScript and development tools'
      });
    }
  ];
};

// Render article
exports.article = function (config) {
  var article = config.article;
  return [
    function renderArticle (req, res) {
      res.render('article.jade', {
        page: 'blog',
        article: article,
        title: article.title + ' - Todd Wolfson',
        seoKeywords: article.keywords,
        seoDescription: article.txtSummary
      });
    }
  ];
};

// Render RSS feed
exports.rss = function (config) {
  return [
    function renderRss (req, res) {
      res.render('xml.ejs', {layout: false, articles: config.articles});
    }
  ];
};
