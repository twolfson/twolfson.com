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
    function renderIndex(req, res) {
      res.render('index.jade', {
        articles: articles,
        activity: activityHtml
      });
    }
  ];
};

// Render article
exports.article = function (config) {
  var article = config.article;
  return [
    function renderArticle(req, res) {
      res.render('article.jade', {
        // DEV: Support dynamic loading for development hack
        article: typeof article === 'function' ? article() : article
      });
    }
  ];
};

// Render RSS feed
exports.rss = function (config) {
  return [
    function renderRss(req, res) {
      res.render('xml.jade', {articles: config.articles});
    }
  ];
};
