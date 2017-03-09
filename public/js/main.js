// Load in our dependencies
var domready = require('./ready');
var hljs = require('./highlight');
var Gator = require('./gator');
void require('./gator-legacy');

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
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/events
  Gator(document).on('click', 'a', function (e) {
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Link click',
      eventAction: this.href || ('Unknown from: ' + window.location.href)
    });
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
