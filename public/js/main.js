// When the DOM is ready
domready(function () {
  // Grab all <code>'s on the page and iterate them
  var $codeArr = document.getElementsByTagName('code'),
      i = 0,
      len = $codeArr.length;
  for (; i < len; i++) {
    // Highlight the code block
    var code = $codeArr[i];
    if (code.parentNode) {
      hljs.highlightBlock(code);
    }
  }
});