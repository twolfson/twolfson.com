{
  "title": "PhantomJS engine for spritesmith",
  "author": "Todd Wolfson",
  "date": "Mon Apr 22 2013 01:00:00",
  "keywords": "phantomjs, spritesmith",
  "summary": "A [phantomjs](http://phantomjs.org/) engine is now available for [spritesmith](https://github.com/Ensighten/spritesmith/), making the cross-platform barrier to entry super-low."
}

A [phantomjs][phantomjs] engine is now available for [spritesmith][spritesmith], making the cross-platform barrier to entry super-low.

Additionally, from this implementation, I moved [spritesmith][spritesmith] to [doubleshot][doubleshot], a BDD framework that separates outline from content. This simplified per-engine testing and made less guesswork during iterations.

[phantomjs]: http://phantomjs.org/
[spritesmith]: https://github.com/Ensighten/spritesmith/
[doubleshot]: https://github.com/twolfson/doubleshot/