// When the DOM is ready
$(function () {
  // Grab all <pre>'s on the page and iterate them
  var $preArr = $('pre');
  $preArr.each(function () {
    // Highlight the code block
    var pre = this;
    if (pre.parentNode) {
      hljs.highlightBlock(pre);
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