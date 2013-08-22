// Load in dependencies
var jojo = require('jojo');

// Export the app
module.exports = function (app) {
  // Configure jojo to use GFM
  app.settings['jojo formatter'] = __dirname + '/gfmParser';

  // Overwrite getUrl
  // TODO: Repair this properly in jojo
  jojo.getUrl = function (article) {
    var urlParts = [],
        date = article._date || article.date;
    if (date) {
      urlParts.push(date.replace(/\//g, '-'));
    }
    urlParts.push(article.title.replace(/\s+/g, '-'));

    return urlParts.join('-').toLowerCase();
  };

  var getXmlSummary = jojo.makeSummary(150, true);
  jojo.getSummary = function (article, formatter) {
    var rawContent = article.rawContent,
        rawSlice = rawContent.slice(0, 200);

    // Nuder any pre-existing tags
    // TODO: Fully remove tags from source
    rawSlice = rawSlice.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Generate and make an xmlSummary
    article.xmlSummary = getXmlSummary(article, formatter);

    // If there is an _summary, use it
    var _summary = article._summary || rawSlice;

    // Generate and return content
    var content = formatter(_summary);
    return content;
  };

  // Notify jojo that all its pages are blog posts
  jojo.config.page = 'blog';
  app.get('*', jojo);
};