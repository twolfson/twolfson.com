// Load in GA and track a page view
var _gaq = _gaq || [];
_gaq.push(['_setAccount',
           window.env === 'production' ? 'UA-17165993-1' : 'UA-17165993-3']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// When the DOM is ready
domready(function () {
  // Track all link clicks
  Gator(document).on('click', 'a', function (e) {
    // Find the href
    var href = this.href || '';

    // If we are going to an outbound page
    if (href.match(/^(https?:\/\/|\/\/)/)) {
      // Track the outbound event
      _gaq.push(['_trackEvent', 'Outbound link' , href]);

      // If we navigating the current window
      if (this.target !== '_blank') {
        // Stop the link from navigating
        Gator.cancel(e);

  // When the RSS link is clicked, track it
  Gator(document).on('click', '.rssLink', function (e) {
    _gaq.push(['_trackEvent', 'RSS clickthrough']);
  });

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