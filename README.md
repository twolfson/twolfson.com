# twolfson.com [![Build status](https://travis-ci.org/twolfson/twolfson.com.png?branch=master)](https://travis-ci.org/twolfson/twolfson.com)

Repository for [http://twolfson.com/][twolfson.com]. This is a server rather than static files due to a [contact form][contact].

This server is written on top of [express][express], for routing and views, and [jojo][jojo], for blog entries.

[twolfson.com]: ttp://twolfson.com/
[contact]: https://github.com/twolfson/twolfson.com/blob/fe4972fe92fe67e23871822b6a25aa0984131fa1/app.js#L97-L120
[express]: http://expressjs.com/2x/
[jojo]: https://github.com/twolfson/jojo/

## Code organization
### Folders
- `articles` - [GitHub Flavored Markdown][gfm] files for blog posts
- `dist` - Minified public files
- `lib` - Container for majority of app
- `lib/app.js` - Server setup and route binding
- `lib/projects` - Assortment of competitions, contributions, and scripts
- `lib/routes` - Declaration of route functionality
- `public` - CSS and JS for the pages
- `test` - BDD tests written in [Mocha][mocha] for [twolfson.com][twolfson.com]
- `views` - Scripted HTML components written in [EJS][ejs]

[gfm]: https://help.github.com/articles/github-flavored-markdown
[mocha]: https://github.com/visionmedia/mocha/
[ejs]: https://github.com/visionmedia/ejs/

### Files
- `README.md` - What you are reading right now
- `grunt.js` - A [grunt][grunt] implementation for linting and minification.

[grunt]: http://gruntjs.com/

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson/

## License
Copyright (c) 2013 Todd Wolfson

Licensed under the MIT license.
