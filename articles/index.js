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

// Expose the articles
module.exports = articles;
