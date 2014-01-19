{
  "title": "Low tech dependency management via grunt tasks",
  "author": "Todd Wolfson",
  "date": "2014/01/19",
  "keywords": "low tech, dependency, bower, volo, jam, curl",
  "summary": "An explanation and walkthrough of managing browser dependencies via [`grunt-zip`](https://github.com/twolfson/grunt-zip/) and [`grunt-curl`](https://github.com/twolfson/grunt-curl)."
}

Every project has an investment cost; an acceptable balance between effort put in now and effort saved later.

Higher level browser dependency solutions like [bower][] and [component][] work great for larger projects but not might be a quick drop-in solution for smaller projects. Additionally, they require opt-in support from repository owners which is not always available (e.g. on [microjs][] projects).

[bower]:
[component]:
[microjs]: http://microjs.com/

My solution for these projects is a combination of [grunt][] tasks that download and extract browser dependencies. On [twolfson.com][], I use the following set of code:

[grunt]:
[twolfson.com]: /

A copy can be found at: [https://github.com/twolfson/twolfson.com/blob/2.17.0/Gruntfile.js]

```js
grunt.initConfig({
  curl: {
    'public/js/ready.js': 'https://raw.github.com/ded/domready/b3ba502dcd41b67fc2fcd06416b9d0be27a8dce2/ready.js',
    'public/js/gator.js': 'https://raw.github.com/ccampbell/gator/1.2.2/gator.js',
    'public/js/gator-legacy.js': 'https://raw.github.com/ccampbell/gator/1.2.2/plugins/gator-legacy.js',

    // http://highlightjs.org/
    highlight: {
      dest: 'tmp/highlight.zip',
      src: {
        url: 'http://highlightjs.org/download/',
        method: 'post',
        headers: {
          'Cookie': 'csrftoken=SameAsCookie'
        },
        form: {
          'csrfmiddlewaretoken': 'SameAsCookie',

  }
});

grunt.registerTask('install', ['curl', 'unzip', 'copy', 'jsbeautifier']);
```