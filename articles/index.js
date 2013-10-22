// Load in dependencies
var assert = require('assert'),
    moment = require('moment'),
    jojo = require('jojo'),
    utils = require('../utils');

// Create a jojo middleware (and only use it to get articles from)
var articles = jojo({
  formatter: utils.markdownToHtml,
  render: false,
  author: 'Todd Wolfson',
  title: 'Todd Wolfson - Javascript Developer',
  url: 'http://twolfson.com/'
}).articles;

// Add a formatted date for each article
articles.forEach(function (article) {
  var date = article.date,
      dateStr = moment(date).format('MMMM DD, YYYY');
  article.dateStr = dateStr;
});

// Add a plain text summary for each article
var unhtml = require('unhtml');
articles.forEach(function (article) {
  if (!article.txtSummary) {
    article.txtSummary = unhtml(article.summary).trim().replace(/\n/g, ' ');
  }
});

// Calculate reading speed for each article
// DEV: Wiki says 250 words per minute so this is very generous timing
// DEV: Currently, this is 2 minutes for free will and 9 minutes for develop faster
var READING_SPEED = 100; // words per minute
articles.forEach(function (article) {
  // TODO: Make this more efficient by iterating rather than splitting
  var txtContent = unhtml(article.content),
      words = txtContent.split(/\s+/g).filter(function (word) {
        // Remove strings without alphanumeric characters (e.g. `+`)
        return word.match(/[A-Za-z0-9]/);
      }),
      wordCount = words.length,
      readingTime = Math.round(wordCount / READING_SPEED);
  article.readingTime = Math.max(readingTime, 1);
});

// Construct objects to look up articles and projectsby
var articleObj = {};
articles.forEach(function (article) {
  articleObj[article.title] = article;
});
var projects = require('../lib/projects'),
    projectObj = {};
Object.getOwnPropertyNames(projects).forEach(function (namespace) {
  var projectsArr = projects[namespace];
  projectsArr.forEach(function (project) {
    projectObj[project.name] = project;
  });
});

// Find and assert all related articles, related projects
articles.forEach(function (article) {
  // Count related items
  var relatedItems = 0;

  // Find related articles
  var relatedArticleTitles = article.relatedArticles;
  if (relatedArticleTitles) {
    article.relatedArticles = relatedArticleTitles.map(function (title) {
      var relatedArticle = articleObj[title];
      assert(relatedArticle, 'Could not locate related article "' + title + '" for "' + article.title + '"');
    });
    relatedItems += relatedArticleTitles.length;
  }

  // Find related projects
  var relatedProjectNames = article.relatedProjects;
  if (relatedProjectNames) {
    article.relatedProjects = relatedProjectNames.map(function (name) {
      var relatedProject = projectObj[name];
      assert(relatedProject, 'Could not locate related project "' + name + '" for "' + article.title + '"');
    });
    relatedItems += relatedProjectNames.length;
  }

  // If there are not enough related items, fill in recent articles
  if (relatedItems < 3) {
    article.recentArticles = articles.slice(0, relatedItems);
  }
});

// Expose the articles
module.exports = articles;
