var marked = require('marked');
module.exports = {
  markdownToHtml: function (md) {
    return marked.parse(md, {langPrefix: ''});
  }
};