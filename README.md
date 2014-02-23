# twolfson.com [![Build status](https://travis-ci.org/twolfson/twolfson.com.png?branch=master)](https://travis-ci.org/twolfson/twolfson.com)

Repository for [http://twolfson.com/][].

This server is written on top of [express][express], for routing and views, and [jojo][jojo], for blog entries.

[http://twolfson.com/]: http://twolfson.com/
[express]: http://expressjs.com/
[jojo]: https://github.com/twolfson/jojo/

## Code organization
### Folders
- `articles/` - [GitHub Flavored Markdown][] files for blog posts
- `bin/twolfson.com` - Executable to start `twolfson.com` locally
- `config/` - Per-environment configuations
- `dist/` - Minified public files
- `server/` - Container for majority of app
    - `app.js` - Server setup and route binding
    - `models/projects/` - Assortment of competitions, contributions, and scripts
    - `routes.js` - Declaration of route functionality
    - `views/` - Scripted HTML components written in [ejs][]
- `public/` - CSS and JS for the pages
- `test/` - Container for various test types
    - `integrations-tests/` - BDD tests written in [mocha][] that test server behavior
    - `perceptual-tests/` - [Perceptual diffs][] that detect visual changes across pages
    - `production-tests/` - BDD tests written in [Mocha][mocha] for [twolfson.com][twolfson.com]

[GitHub Flavored Markdown]: https://help.github.com/articles/github-flavored-markdown
[ejs]: https://github.com/visionmedia/ejs/
[mocha]: https://github.com/visionmedia/mocha/
[Perceptual diffs]: http://www.youtube.com/watch?v=UMnZiTL0tUc

### Files
- `README.md` - Documentation for the project
- `Gruntfile.js` - A [grunt][grunt] implementation for linting and minification.

[grunt]: http://gruntjs.com/

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson/

## License
Copyright (c) 2013 Todd Wolfson

Licensed under the MIT license.
