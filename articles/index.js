// Load in dependencies
var marked = require('marked'),
    moment = require('moment'),
    jojo = require('jojo');

// Create a jojo middleware (and only use it to get articles from)
var articles = jojo({
  formatter: function (code) {
    return marked.parse(code, {langPrefix: ''});
  },
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
// TODO: Wiki says 250 words per minute so this is very generous timing
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

// Expose the articles
module.exports = articles;
