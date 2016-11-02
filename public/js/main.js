// Define window level error generators for testing Sentry
window.errorGenerators = {
  // Test via: setTimeout(function () { errorGenerators.syncError(); }, 100);
  // DEV: Sync errors don't get sent to Sentry when run directly by console
  syncError: function () {
    throw new Error('Sync error');
  },
  // Test via: errorGenerators.asyncError();
  asyncError: function () {
    setTimeout(function handleSetTimeout () {
      throw new Error('Async error');
    }, 100);
  }
};

// When the DOM is ready
domready(function () {
  // Track all link clicks
  Gator(document).on('click', 'a', function (e) {
    _gaq.push(['_trackEvent', 'Link click', this.href || ('Unknown from: ' + window.location.href)]);
  });

  // Alias languages to their shorthands
  hljs.LANGUAGES.js = hljs.LANGUAGES.javascript;
  hljs.LANGUAGES.html = hljs.LANGUAGES.xml;
  hljs.LANGUAGES.yaml = hljs.LANGUAGES.python;

  // Grab all <code>'s on the page and iterate them
  var $codeArr = document.getElementsByTagName('code');
  var i = 0;
  var len = $codeArr.length;
  for (; i < len; i++) {
    // Highlight the code block
    var code = $codeArr[i];
    if (code.parentNode) {
      hljs.highlightBlock(code);
    }
  }
});
