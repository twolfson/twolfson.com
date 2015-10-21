// Load in dependencies
var assert = require('assert');
var jojo = require('jojo');
var marked = require('marked');

// Modify marked's tokenizer to wrap header text in an `<a>`
var _tok = marked.Parser.prototype.tok;
marked.Parser.prototype.tok = function () {
  // If we are in a heading, return our customized heading parser
  // https://github.com/chjj/marked/blob/ab84e8c6055b020f29134b93c86a9ae2ce955706/lib/marked.js#L845-L855
  if (this.token.type === 'heading') {
    var slug = this.token.text.toLowerCase().replace(/[^\w]+/g, '-');
    return '<h'
          + (this.token.depth + 2)
          + ' id="'
          + slug
          + '">'
          + '<a href="#' + slug + '" class="link--hover-only">'
          + this.inline.output(this.token.text)
          + '</a>'
          + '</h'
          + this.token.depth
          + '>\n';
  }

  // Otherwise, run the normal function
  return _tok.apply(this, arguments);
};

// Create a jojo middleware (and only use it to get articles from)
var articles = jojo({
  formatter: function (md) {
    return marked.parse(md, {langPrefix: ''});
  },
  render: false
}).articles;

// For each of our articles, verify there is a timezone (so we can properly parseZone)
articles.forEach(function verifyArticleTimezone (article) {
  assert(article._tzm, 'Timezone was not specified for article "' + article.name + '"');
});

// Add a formatted date for each article
articles.forEach(function (article) {
  var dateStr = article.moment.format('MMMM DD, YYYY');
  article.dateStr = dateStr;
});

// Add a plain text summary for each article
var unhtml = require('unhtml');
articles.forEach(function (article) {
  if (!article.txtSummary) {
    article.txtSummary = unhtml(article.summary).trim().replace(/\n/g, ' ');
  }
});

// Add a title slug for each article
articles.forEach(function (article) {
  if (!article.titleSlug) {
    // Grabbed from https://github.com/chjj/marked/blob/ab84e8c6055b020f29134b93c86a9ae2ce955706/lib/marked.js#L850
    article.titleSlug = article.title.toLowerCase().replace(/[^\w]+/g, '-');
  }
});

// TODO: Add hidden projects that can be linked to articles (e.g. doubleshot for bdd-and-the-future)

// Construct objects to look up articles and projects by
// TODO: This is not the correct place to map relationships as projects can never read articles now =(
var articleObj = {};
articles.forEach(function (article) {
  articleObj[article.title] = article;
});
var projects = require('../server/models/projects').toJSON();
var projectObj = {};
Object.getOwnPropertyNames(projects).forEach(function (namespace) {
  var projectsArr = projects[namespace];
  projectsArr.forEach(function (project) {
    projectObj[project.name] = project;
  });
});

// Find and assert all related articles, related projects
var TOP_ARTICLES = [
  articleObj['Develop faster'],
  articleObj['Sexy bash prompt']
];
TOP_ARTICLES.forEach(assert);
articles.forEach(function (article) {
  // Collect related items
  var relatedItems = [];

  // If we mistyped keys, warn yourself
  Object.getOwnPropertyNames(article).forEach(function (key) {
    if (key.match(/related/i) && !key.match(/^related(Articles|Projects)$/)) {
      console.warn('Article "' + article.name + '" has property "' + key + '" (not `relatedArticles`, `relatedProjects`)');
    }
  });

  function isNotCurrentArticle(item) {
    return item !== article;
  }

  function isUnrelatedItem(item) {
    return relatedItems.indexOf(item) === -1;
  }

  // Find related articles
  var relatedArticleTitles = article.relatedArticles;
  if (relatedArticleTitles) {
    var relatedArticles = relatedArticleTitles.map(function (title) {
      var relatedArticle = articleObj[title];
      assert(relatedArticle, 'Could not locate related article "' + title + '" for "' + article.title + '"');
      return relatedArticle;
    }).filter(isNotCurrentArticle);
    article.relatedArticles = relatedArticles;
    relatedItems.push.apply(relatedItems, relatedArticles);
  }

  // Find related projects
  var relatedProjectNames = article.relatedProjects;
  if (relatedProjectNames) {
    var relatedProjects = relatedProjectNames.map(function (name) {
      var relatedProject = projectObj[name];
      assert(relatedProject, 'Could not locate related project "' + name + '" for "' + article.title + '"');
      return relatedProject;
    });
    article.relatedProjects = relatedProjects;
    relatedItems.push.apply(relatedItems, relatedProjects);
  }

  // If there are not enough related items, add features projects
  if (relatedItems.length < 3) {
    var topArticles = TOP_ARTICLES
                        .filter(isNotCurrentArticle)
                        .filter(isUnrelatedItem)
                        .slice(0, 3 - relatedItems.length);
    article.topArticles = topArticles;
    relatedItems.push.apply(relatedItems, topArticles);
  }

  // If there are not enough related items, fill in recent articles
  if (relatedItems.length < 3) {
    var recentArticles = articles
                          .filter(isNotCurrentArticle)
                          .filter(isUnrelatedItem)
                          .slice(0, 3 - relatedItems.length);
    article.recentArticles = recentArticles;
    relatedItems.push.apply(relatedItems, recentArticles);
  }

  // Assert as a safeguard for articles
  assert.strictEqual(relatedItems.length, 3, 'Related items is not at 3 for "' + article.title + '"');
});

// Expose the articles
module.exports = articles;
