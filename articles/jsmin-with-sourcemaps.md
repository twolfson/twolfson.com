{
  "title": "JSMin with sourcemaps",
  "author": "Todd Wolfson",
  "date": "2012-10-07",
  "keywords": "jsmin, sourcemap, compression, minification",
  "summary": "Introducing JSMin with sourcemaps -- available as a [node module](https://github.com/twolfson/node-jsmin-sourcemap) and as a [grunt plugin](https://github.com/twolfson/grunt-jsmin-sourcemap).",
  "relatedProjects": ["jsmin-sourcemap"]
}

Introducing JSMin with sourcemaps -- available as a [node module](https://github.com/twolfson/node-jsmin-sourcemap) and as a [grunt plugin](https://github.com/twolfson/grunt-jsmin-sourcemap).

Example
=======
grunt.js example
```js
// Load in the jsmin-sourcemap task
grunt.loadNpmTasks('grunt-jsmin-sourcemap');

// Set up our grunt config
grunt.initConfig({
  'jsmin-sourcemap': {
    all: {
      // Source files to concatenate and minify (also accepts a string and minimatch items)
      src: ['public/js/jquery.js', 'public/js/underscore.js'],

      // Destination for concatenated/minified JavaScript
      dest: 'dist/js/all.min.js',

      // Destination for sourcemap of minified JavaScript
      destMap: 'dist/js/all.js.map'
    }
  }
});
```

node.js example
```js
// Load in jsmin and jQuery
var jsmin = require('node-jsmin-sourcemap'),
    jquerySrc = fs.readFileSync('jquery.js', 'utf8');

// Process the jquery source via jsmin
var jqueryMinObj = jsmin({'code':jQuerySrc,'src':'jquery.js','dest':'jquery.min.js'});

// Minified code is available at
// jqueryMinObj.code;

// Sourcemap is available at
// jqueryMinObj.sourcemap;
```

Modules
=======
Out of this, I have written *4* new node modules:

- [node-jsmin2](https://github.com/twolfson/node-jsmin2/) - Direct port of JSMin from C to JS via string replacements
- [char-props](https://github.com/twolfson/char-props) - Utility for looking up line and column of a character at a given index and vice versa
- [node-jsmin-sourcemap](https://github.com/twolfson/node-jsmin-sourcemap) - JSMin with sourcemaps!
- [grunt-jsmin-sourcemap](https://github.com/twolfson/grunt-jsmin-sourcemap) - Grunt task for JSMin with sourcemap

Journey to sourcemap glory
==========================
Below are the steps I have taken along the path to sourcemap glory.

- Fork [node-jsmin](https://github.com/twolfson/node-jsmin/tree/dev/ignore.important.comments.for.now) and progressively rewrite to understand inner workings (not on `master`)
- After understanding the majority, I began to attempt to hack in pointers.
- Then, I became frustrated at pre-mature string concatenation and decided to rewrite jsmin.
- As a result, I took the latest [JSMin](https://github.com/douglascrockford/JSMin) from Crockford himself and created a set of string macros which converted it into JS.
- Then, I took the low level JSMin + coordinate map and used them inside of [node-jsmin-sourcemap](https://github.com/twolfson/node-jsmin-sourcemap).
- However, I could not directly use character indices with the [source-map repo](https://github.com/mozilla/source-map).
- As a result, I created another module ([char-props](https://github.com/twolfson/char-props)) which assisted in looking up lines and columns of indicies.
- Once all of that was said, done, and tested, I moved on to the grand finale of [grunt-jsmin-sourcemap](https://github.com/twolfson/grunt-jsmin-sourcemap).


Enjoy JSMin + sourcemaps!