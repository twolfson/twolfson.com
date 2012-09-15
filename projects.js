var scripts = [{
  'name': 'File Watcher',
  'description': 'Watch your files for a hands-free browser refresh!',
  'stars': 93,
  'forks': 1,
  'github': 'twolfson/File-Watcher'
}, {
  'name': 'jojo',
  'description': 'the 10 second blog engine for hackers (in javascript)',
  'stars': 23,
  'forks': 0,
  'github': 'twolfson/jojo'
}, {
  'name': 'CSS Query',
  'description': 'Lightweight cross-browser CSS selector (&lt;3kb)',
  'stars': 5,
  'forks': 1,
  'github': 'Ensighten/CSS-Query'
}, {
  'name': 'Mason.js',
  'description': 'HTML pre-processor that auto-instantiates UI interactivity',
  'stars': 3,
  'forks': 1,
  'github': 'twolfson/Mason.js'
}, {
  'name': 'Resource Collector',
  'description': 'Collect all resources off of a page (including CSS ones)!',
  'stars': 2,
  'forks': 0,
  'github': 'twolfson/Resource-Collector'
}, {
  'name': 'twolfson.com',
  'description': 'The website you are currently on ;)',
  'stars': 1,
  'forks': 0,
  'github': 'twolfson/twolfson.com'
}, {
  'name': 'Atomic Event',
  'description': 'Race condition handler under <a href="http://140byt.es/" target="_blank">140 bytes</a>',
  'stars': 0,
  'forks': 0,
  'github': 'gist/2668303'
}];

var competitions = [{
  'name': 'IndexedDB Editor',
  'competition': 'MDN Dev Derby - IndexedDB',
  'description': 'Visual editor for IndexedDB',
  'views': 406,
  'likes': 4,
  'award': '3rd place!',
  'github': 'twolfson/IndexedDB-Editor',
  'mdn': 'indexeddb-editor'
}, {
  'type': 'cssOff',
  'name': 'CSS Off',
  'competition': 'Unmatched Style - Triple Dare',
  'description': 'Take a PSD mockup and convert it to an interactive website',
  'score': '61 of 100 points',
  'rank': '66th of 417',
  'github': 'twolfson/CSS-Off--2011-',
  'srcUrl': 'http://www.unmatchedstyle.com/cssoff/',
  'url': 'http://twolfson.github.com/CSS-Off--2011-/'
}, {
  'name': 'Media Query Sprites',
  'competition': 'MDN Dev Derby - Media Queries',
  'description': 'Control your CSS sprites via media queries',
  'views': 184,
  'likes': 2,
  'award': 'Finalist!',
  'github': 'twolfson/Mozilla-Dev-Derby---CSS-Media-Queries',
  'mdn': 'spriting-with-css-media-queries'
}, {
  'name': 'Heat Pad',
  'competition': 'MDN Dev Derby - Canvas',
  'description': 'Heat Pad displays a heat map of your mouse actions',
  'views': 90,
  'likes': 2,
  'github': 'twolfson/Mozilla-Dev-Derby---Canvas',
  'mdn': 'heat-pad'
}, {
  'name': 'Audio Playground',
  'competition': 'MDN Dev Derby - Audio',
  'description': 'Audio Playground generates sounds based on mouse position',
  'views': 209,
  'likes': 4,
  'github': 'twolfson/Mozilla-Dev-Derby---Audio',
  'mdn': 'audio-playground'
}, {
  'name': 'Mock Toucher',
  'competition': 'MDN Dev Derby - Touch Events',
  'description': 'Mock Toucher emulates multiple touch events via mouse clicks',
  'views': 106,
  'likes': 2,
  'github': 'twolfson/Mock-Toucher',
  'mdn': 'mock-toucher'
}, {
  'name': 'Heart drawing tweet',
  'competition': 'JS1K - Love',
  'description': 'Animated double heart drawing in 140 bytes',
  'srcUrl': 'http://js1k.com/2012-love/demo/1170',
  'url': 'http://js1k.com/2012-love/demo/1170'
}];

var contributions = [{
  'name': 'nodemon',
  'description': 'Monitor changes &hellip; and automatically restart the server',
  'stars': 802,
  'forks': 68,
  'github': 'remy/nodemon'
}, {
  'name': 'source-map',
  'description': '<a href="https://wiki.mozilla.org/DevTools/Features/SourceMap" target="_blank">https://wiki.mozilla.org/DevTools/Features/SourceMap</a>',
  'stars': 80,
  'forks': 11,
  'github': 'mozilla/source-map'
}, {
  'name': 'jquip',
  'description': 'jQuery in Parts',
  'stars': '1.2k',
  'forks': 56,
  'github': 'mythz/jquip'
}];

// Generate a srcUrl and pageUrl for scripts, competitions, and contributions
scripts.forEach(saveSrcUrl);
scripts.forEach(savePageUrl);
competitions.forEach(saveSrcUrl);
competitions.forEach(savePageUrl);
contributions.forEach(saveSrcUrl);
contributions.forEach(savePageUrl);

module.exports = {
  "scripts": scripts,
  "competitions": competitions,
  "contributions": contributions
};

function getSrcUrl(item) {
  // Get the github info and url fallback
  var github = item.github,
      srcUrl = item.srcUrl;

  // If there is a srcUrl, return now
  if (srcUrl !== undefined) {
    return srcUrl;
  }

  // Fallback srcUrl to url
  srcUrl = item.url;

  // If there is a github repo, use that
  if (github !== undefined) {
    // If the item is a gist, return it as such
    var isGist = github.indexOf('gist') > -1;
    if (isGist) {
      srcUrl = 'https://gist.github.com/' + github.slice(5);
    } else {
    // Otherwise, go with the normal github flow
      srcUrl = 'https://github.com/' + github;
    }
  }

  return srcUrl;
}

function getPageUrl(item) {
  var srcUrl = getSrcUrl(item),
      mdn = item.mdn,
      pageUrl = item.url;

  // If the pageUrl is not defined
  if (pageUrl === undefined) {
    // and mdn is defined, use that
    if (mdn !== undefined) {
      pageUrl = 'https://developer.mozilla.org/en-US/demos/detail/' + mdn;
    } else {
    // Otherwise, fallback to the srcUrl
      pageUrl = srcUrl;
    }
  }

  return pageUrl;
}

function saveSrcUrl(item) {
  var srcUrl = getSrcUrl(item);
  item.srcUrl = srcUrl;
}

function savePageUrl(item) {
  var pageUrl = getPageUrl(item);
  item.pageUrl = pageUrl;
}