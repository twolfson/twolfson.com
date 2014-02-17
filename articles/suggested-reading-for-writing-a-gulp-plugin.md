{
  "title": "Suggested reading for writing a Gulp plugin",
  "author": "Todd Wolfson",
  "date": "2014-02-17T03:14:08.194-08:00",
  "keywords": "sublime, sublime text, plugin, test",
  "summary": "Overview of good resources for creating a [Gulp](http://gulpjs.com/) plugin"
}

After completing [`gulp.spritesmith`][], it looks like there is a gap between [gulp's][gulp] documentation and plugin authors.

[`gulp.spritesmith`]: https://github.com/twolfson/gulp.spritesmith
[gulp]: http://gulpjs.com/

If you are vague on the inner workings on of [gulp][], it is [node's vanilla streams][node-streams] combined with a custom file system layer, known as [vinyl][].

[node-streams]: http://nodejs.org/api/stream.html
[vinyl]: https://github.com/wearefractal/vinyl

This [slideshow][gulp-slideshow] by [@contra][], one of gulp's authors, and explains this concept nicely.

[gulp-slideshow]: http://slid.es/contra/gulp
[@contra]: https://twitter.com/eschoff

<iframe src="//slid.es/contra/gulp/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>