{
  "title": "Suggested reading for writing a Gulp plugin",
  "author": "Todd Wolfson",
  "date": "2014-02-17T03:14:08.194-08:00",
  "keywords": "sublime, sublime text, plugin, test",
  "summary": "Overview of good resources for creating a [Gulp](http://gulpjs.com/) plugin"
}

After completing [`gulp.spritesmith`][], it looks like there is a gap between [gulp's documentation][gulp-docs] and plugin authors.

[gulp-docs]: https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md

[`gulp.spritesmith`]: https://github.com/twolfson/gulp.spritesmith
[gulp]: http://gulpjs.com/

If you are vague on the inner workings on of [gulp][], it is [node's vanilla streams][node-streams] combined with a custom file system layer, known as [vinyl][].

[node-streams]: http://nodejs.org/api/stream.html
[vinyl]: https://github.com/wearefractal/vinyl

This [slideshow][gulp-slideshow] by [@contra][], one of gulp's authors, and explains this concept nicely.

[gulp-slideshow]: http://slid.es/contra/gulp
[@contra]: https://twitter.com/eschoff

<iframe src="//slid.es/contra/gulp/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

If you are shaky on your knowledge of streams, some good reading/activies are:

- http://nodeschool.io/
- https://github.com/substack/stream-handbook
- Write a streaming library outside of gulp

If you are uncertain of where to get started/are stuck, try reading some other gulp plugins.

- https://github.com/wearefractal/gulp-concat
- https://github.com/sindresorhus/gulp-rev

Lastly, it is suggested to embrace utilities/modules. You can write everything from scratch but it will be more verbose than necessary. Some practical libraries are:

- https://github.com/rvagg/through2
- https://github.com/gulpjs/gulp-util
