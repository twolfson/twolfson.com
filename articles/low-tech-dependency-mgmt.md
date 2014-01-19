{
  "title": "Low tech dependency management via grunt tasks",
  "author": "Todd Wolfson",
  "date": "2014/01/19",
  "keywords": "low tech, dependency, bower, volo, jam, curl",
  "summary": "An explanation and walkthrough of managing browser dependencies via [`grunt-zip`](https://github.com/twolfson/grunt-zip/) and [`grunt-curl`](https://github.com/twolfson/grunt-curl)."
}

Every project has an investment cost; an acceptable balance between effort put in now and effort saved later.

The benefit of a low-tech solution over higher level ones (e.g. [bower][], [component][]) are:

- No opt-in support required from repositories
- Keep record of where dependencies came from
- Manage complex sets of options for libraries (e.g. [highlightjs][])
- Blends in to normal [grunt][] workflow

[bower]:
[component]:
[highlightjs]: http://highlightjs.org/
[microjs]: http://microjs.com/

My solution for these projects is a combination of [grunt][] tasks that download and extract browser dependencies. On [twolfson.com][], I use the following set of code:

[grunt]:
[twolfson.com]: /

A copy can be found at: https://github.com/twolfson/twolfson.com/blob/2.17.0/Gruntfile.js

```js
grunt.initConfig({
  curl: {
    // Micro libraries via http://microjs.com/
    'public/js/ready.js': 'https://raw.github.com/ded/domready/b3ba502dcd41b67fc2fcd06416b9d0be27a8dce2/ready.js',
    'public/js/gator.js': 'https://raw.github.com/ccampbell/gator/1.2.2/gator.js',
    'public/js/gator-legacy.js': 'https://raw.github.com/ccampbell/gator/1.2.2/plugins/gator-legacy.js',

    highlight: {
      dest: 'tmp/highlight.zip',
      src: {
        url: 'http://highlightjs.org/download/',
        method: 'post',
        form: {'bash.js': 'on'/*, ... */}
      }
    }
  },
  unzip: {
    highlight: {
      src: 'tmp/highlight.zip',
      dest: 'tmp/highlight'
    }
  },
  copy: {
    'public/css/base/highlight.scss': 'tmp/highlight/styles/github.css',
    'public/js/highlight.js': 'tmp/highlight/highlight.pack.js'
  }
});

// Combine all actions into a single task
grunt.registerTask('install', ['curl', 'unzip', 'copy']);
```

