exports.index = function (config) {
  var articles = config.articles;
  return function renderIndex (req, res) {
    res.render('index', {
      page: 'blog',
      articles: articles,
      title: 'Todd Wolfson - Blog',
      seoKeywords: 'Todd Wolfson, twolfson, twolfsn, blog, javascript, web dev',
      seoDescription: 'Blog about JavaScript and development tools'
    });
  };
};

exports.article = function (config) {
  var article = config.article;
  return  function renderArticle (req, res) {
    console.log(article.summary);
    res.render('article', {
      page: 'blog',
      article: article,
      title: article.title + ' - Todd Wolfson',
      seoKeywords: article.keywords,
      seoDescription: article.txtSummary
    });
  };
};

exports.rss = function (req, res) {
  res.render('xml', {layout: false});
};
