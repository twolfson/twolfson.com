{
  "title": "Hands-Free Refresh Anywhere - File Watcher et al.",
  "author": "Todd Wolfson",
  "date": "2012/03/25",
  "keywords": "file watcher, live coding, hands free refresh",
  "summary": "When [UMS' CSS Off](http://www.unmatchedstyle.com/cssoff/) started in Late October, I was getting frustrated at needing to manually refresh for any page change -- no matter how small.",
  "_relProjects": ["File Watcher"]
}

Backstory
=========
When [UMS' CSS Off](http://www.unmatchedstyle.com/cssoff/) started in Late October, I was getting frustrated at needing to manually refresh for any page change -- no matter how small.

I searched and found some solutions for this: [node-hotcode](https://github.com/mape/node-hotcode), [Refresh Monkey](https://chrome.google.com/webstore/detail/ljngnafhejmefmijjoedbclkadhacebd), [Auto-Refresh](https://addons.mozilla.org/en-US/firefox/addon/auto-refresh/), and [LiveReload](http://livereload.com/). However, all of these were either browser-specific, solved the wrong problem, and/or unintentially/intentially not cross-platform.

Since my development environment was Firefox with Firebug on Windows, I was up a creek with either a bad paddle or none at all.

Solving the problem
===================
At first, nothing came to light so I put the problem on the backburner. A few hours later, the answer fell out -- [XHR's](http://en.wikipedia.org/wiki/XMLHttpRequest) that watch the page for changes.

The ramifications of this method are clear: JavaScript and the DOM are standarized (enough) to allow for a cross-browser and cross-platform solution that does not require server-integration.

As a result, I got to coding a quick and dirty Proof of Concept. I had actually finished it pretty early into the contest but due to the pressure of the CSS Off, I was not given any time to polish/open source. Then, even more pressure came down as I took on a rebuild of our UI at [Ensighten](http://ensighten.com/).

Eventually, I found some free time again in Early February and cleaned up, segmented, and tested the code. The finished product was well worth the wait though and I hope you enjoy using it.

Your Hands-Free Refresh
=======================
The final product has 2 parts:

1. [File Watcher](https://github.com/twolfson/File-Watcher) which uses a circular queue to XHR watch over a set of files that you set.
2. [Resource Collector](https://github.com/twolfson/Resource-Collector) which collects from groups of resources on the page (inner CSS urls, inline src's, and the page itself) and returns them in an array format.

The initial purpose was to watch every resource on the page and here is a snippet that does just that:

    <script src="https://raw.github.com/twolfson/File-Watcher/master/src/watcher.js"></script>
    <script src="https://raw.github.com/twolfson/Resource-Collector/master/src/collector.js"></script>
    <script>
      (function () {
        var watcher = new FileWatcher(),
            resources = ResourceCollector.collect();
        watcher.addListener(function () {
          location.reload();
        });
        watcher.watch(resources);
      }());
    </script>

For more documentation and found issues, please refer to their respective GitHub's:

[File Watcher](https://github.com/twolfson/File-Watcher) and [Resource Collector](https://github.com/twolfson/Resource-Collector).