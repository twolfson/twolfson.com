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
});