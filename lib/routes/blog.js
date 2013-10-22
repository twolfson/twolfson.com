// Load and convert activity
var fs = require('fs'),
    utils = require('../../utils'),
    activityMd = fs.readFileSync(__dirname + '/blog_activity.md', 'utf8'),
    activityHtml = utils.markdownToHtml(activityMd);

// Render homepage
exports.index = function (config) {
  var articles = config.articles;
  return function renderIndex (req, res) {
    res.render('index', {
      page: 'blog',
      articles: articles,
      activity: activityHtml,
      title: 'Todd Wolfson - Blog',
      seoKeywords: 'Todd Wolfson, twolfson, twolfsn, blog, javascript, web dev',
      seoDescription: 'Blog about JavaScript and development tools'
    });
  };
};

// Render article
exports.article = function (config) {
  var article = config.article;
  return  function renderArticle (req, res) {
    res.render('article', {
      page: 'blog',
      article: article,
      title: article.title + ' - Todd Wolfson',
      seoKeywords: article.keywords,
      seoDescription: article.txtSummary
    });
  };
};

// Render RSS feed
exports.rss = function (req, res) {
  res.render('xml', {layout: false});
};
