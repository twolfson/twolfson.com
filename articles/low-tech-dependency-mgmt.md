{
  "title": "Low tech dependency management via grunt tasks",
  "author": "Todd Wolfson",
  "date": "2014/01/19",
  "keywords": "low tech, dependency, bower, volo, jam, curl",
  "summary": "An explanation and walkthrough of managing browser dependencies via [`grunt-zip`](https://github.com/twolfson/grunt-zip/) and [`grunt-curl`](https://github.com/twolfson/grunt-curl)."
}

For small projects, a high level dependency solution (e.g. [bower][], [component][]) can take up more time than it's worth. As a result, I opt for a combination of [grunt][] tasks that download and extract my dependencies.

Benefits to this approach include:

- No opt-in support required from repositories
- Keep record of where dependencies came from
- Manage complex sets of options for libraries (e.g. [highlightjs][])
- Blends in to normal [grunt][] workflow

[bower]: http://bower.io/
[component]: http://component.io/
[grunt]: http://gruntjs.com/
[highlightjs]: http://highlightjs.org/

Below is a [stripped down set][gruntfile] of what is used for [twolfson.com][]:

[gruntfile]: https://github.com/twolfson/twolfson.com/blob/2.17.0/Gruntfile.js
[twolfson.com]: /

```js
grunt.initConfig({
  curl: {
    // Micro libraries via http://microjs.com/
    'public/js/ready.js': 'https://raw.github.com/ded/domready/b3ba502dcd41b67fc2fcd06416b9d0be27a8dce2/ready.js',
    'public/js/gator.js': 'https://raw.github.com/ccampbell/gator/1.2.2/gator.js',
    'public/js/gator-legacy.js': 'https://raw.github.com/ccampbell/gator/1.2.2/plugins/gator-legacy.js',

    // Example of complex flags
    highlight: {
      dest: 'tmp/highlight.zip',
      src: {
        url: 'http://highlightjs.org/download/',
        method: 'post',
        form: {'bash.js': 'on', 'css.js': 'on'/*, ... */}
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

Running `grunt install` yields:

```bash
Running "curl:public/js/ready.js" (curl) task
File "public/js/ready.js" created.

Running "curl:public/js/gator.js" (curl) task
File "public/js/gator.js" created.

Running "curl:public/js/gator-legacy.js" (curl) task
File "public/js/gator-legacy.js" created.

Running "unzip:highlight" (unzip) task
File "tmp/highlight" created.

Running "copy:public/css/base/highlight.scss" (copy) task
Copied 1 files

Running "copy:public/js/highlight.js" (copy) task
Copied 1 files

Done, without errors.
```

Additional file sets include [inuit.css][], [960gridder][] (not available on [bower][]), and [bourbon][] (not available at older versions on [bower][]).

[inuit.css]: https://github.com/csswizardry/inuit.css
[960gridder]: http://peol.github.io/960gridder/
[bourbon]: http://bourbon.io/

> The original inspiration for this came from [Bootstrap's customize feature][bootstrap-customize]. I wanted a solution to download a pre-compiled custom flavor of [Bootstrap][].
>
> The original proof of concept featured downloading the uncustomized flavor but it can be found here: https://gist.github.com/twolfson/4526992

[bootstrap-customize]: http://twbs.github.io/bootstrap/customize/
[Bootstrap]: http://twbs.github.io/bootstrap/