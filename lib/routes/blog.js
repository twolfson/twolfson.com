exports.index = function (config) {
  var articles = config.articles;
  return function renderIndex (req, res) {
    res.render('index', {page: 'blog', articles: articles});
  };
};

exports.article = function (config) {
  var article = config.article;
  return  function renderArticle (req, res) {
    res.render('article', {page: 'blog', article: article});
  };
};

exports.rss = function (req, res) {
  res.render('xml', {layout: false});
};
