// When the DOM is ready
$(function () {
  // Grab all <code>'s on the page and iterate them
  var $codeArr = $('code');
  $codeArr.each(function () {
    // Highlight the code block
    var code = this;
    if (code.parentNode) {
      hljs.highlightBlock(code);
    }
  });

  // Get all truncate items
  var $truncateArr = $('.text-truncate');
  $truncateArr.each(function () {
    // Truncate each item
    var $this = $(this);

    // If this is an article summary and contains a link or boldened text, skip truncation
    // TODO: Undo this hack ;_;
    var isArticleSummary = $this.hasClass('article-summary');
    if(isArticleSummary) {
      var containsBoldenedText = $this.has('a, b, strong');
      if (containsBoldenedText) {
        return;
      }
    }

    $this.trunkata({'lines': 1});
  });
});