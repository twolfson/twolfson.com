{
  "title": "Major releases in spritesmith",
  "author": "Todd Wolfson",
  "date": "2015-11-22T16:48:13-0600",
  "keywords": "spritesmith, release",
  "summary": "We have "
}

Over the past month, we have been taking steps to update and formalize `spritesmith's` API. It's fallen behind on the times and we wanted to fix it up.

Here's a short list of the things that we have changed:

- Broke up the test suite/spec hybrid into separate repos
    - https://github.com/twolfson/spritesmith-engine-spec
    - https://github.com/twolfson/spritesmith-engine-test
- Updated engine specification
    - Moved to constructor for `Engine`
        - Allows for setting options for engines on a per-task basis instead of a global singleton
    - Moved to streaming output over binary string/buffer
        - Allows for more efficient memory usage and faster writes to disk
    - Updated API to use async only for image initialization
        - Removes unnecessary async logic handling for sync actions
    - Added support for [Vinyl][] as input
        - Allows in-memory engines like [pixelsmith][] and [canvassmith][] to better support [gulp.spritesmith][]
- Updated [spritesmith][] API to emulate underlying engine API
    - Broke down into constructor with 2 methods (i.e. `createImages`, `processImages`)
    - Moved to async only for image creation
    - Moved to streaming output for `processImages`
- Updated [grunt-spritesmith][] to leverage streaming output
- Updated [gulp.spritesmith][] to leverage [Vinyl][] input support and streaming output
- Started a newsletter to make it easier to receive updates about [spritesmith][]
    - http://eepurl.com/bD4qkf

[Vinyl]: https://github.com/gulpjs/vinyl

A full list of changes can be found here:

https://gist.github.com/twolfson/d303342301cd7a1c0b4b

# Links
Here's a full list of all the repos we worked on:

- [grunt-spritesmith][]
- [gulp.spritesmith][]
- [spritesmith][]
- [spritesmith-engine-spec][]
- [spritesmith-engine-test][]
- Engines
    - [canvassmith][]
    - [gmsmith][]
    - [phantomjssmith][]
    - [pixelsmith][]

[grunt-spritesmith]: https://github.com/Ensighten/grunt-spritesmith
[gulp.spritesmith]: https://github.com/twolfson/gulp.spritesmith
[spritesmith]: https://github.com/Ensighten/spritesmith
[spritesmith-engine-spec]: https://github.com/twolfson/spritesmith-engine-spec
[spritesmith-engine-test]: https://github.com/twolfson/spritesmith-engine-test
[canvassmith]: https://github.com/twolfson/canvassmith
[gmsmith]: https://github.com/twolfson/gmsmith
[phantomjssmith]: https://github.com/twolfson/phantomjssmith
[pixelsmith]: https://github.com/twolfson/pixelsmith
