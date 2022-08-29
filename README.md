# twolfson.com [![Build status](https://travis-ci.org/twolfson/twolfson.com.png?branch=master)](https://travis-ci.org/twolfson/twolfson.com)

Repository for [https://twolfson.com/][]

This server is written on top of [express][], for routing and views, and [jojo][], for blog entries.

We use [`inuit.css`][] as our CSS framework to provide [OOCSS][] and [BEM][] conventions.

[https://twolfson.com/]: https://twolfson.com/
[express]: https://expressjs.com/
[jojo]: https://github.com/twolfson/jojo/
[`inuit.css`]: https://github.com/csswizardry/inuit.css
[OOCSS]: https://oocss.org/
[BEM]: https://bem.info/

## Getting started
The following steps will get a server running locally:

```bash
# Clone the repository
git clone https://github.com/twolfson/twolfson.com
cd twolfson.com

# Install our dependencies
npm install

# Run the server
npm start # should say 'Server running at http://localhost:8080/'
# For continuous development, use `nodemon`
# nodemon -x bin/twolfson.com
```

The server should be accessible via your browser at [http://localhost:8080/](http://localhost:8080/)

## Documentation
### Development
#### Configuration
Our secrets are stored in environment variables. To update a secret, update it in:

- `.env.development` with a mock example
- `.env.development.local` for actual usage
- In each server, under `/etc/profile.d/twolfson.com-secrets.sh`

Historically we used [SOPS][] but it was overkill for a simple blog server, and setup across new computers was tedious with no extra value.

[SOPS]: https://github.com/mozilla/sops

Additional documentation can be found in:

- https://github.com/twolfson/twolfson.com-scripts

#### CSS
Our CSS is written in [SASS][].

CSS compilation is run by default as part of the main `gulp build` task but can be run standalone:

```bash
gulp build-css
```

[SASS]: https://sass-lang.com/
[`libsass`]: https://github.com/sass/libsass

#### Images
Images are compiled into spritesheets via [`gulp.spritesmith`][]. These are run via a standalone [`gulp`][] task:

```bash
gulp sprite
```

[`gulp`]: https://gulpjs.com/
[`gulp.spritesmith`]: https://github.com/twolfson/gulp.spritesmith

#### JS
External JS libraries are managed via `bin/bootstrap.sh`. To install the latest versions, please run:

```bash
bin/bootstrap.sh
```

As with CSS these are run by default as part of the main `gulp build` task but can be run standalone:

```bash
gulp build-js
```

#### Automated recompiled and refreshes
We leverage [`gulp`][] to automatically re-run JS and CSS tasks when their files change.

Additionally, they are integrated with [LiveReload][]. When the complementary browser extension is installed, your browser will automatically reload CSS or refresh the page upon changes.

```bash
npm run develop
```

LiveReload extension: https://livereload.com/extensions/

[LiveReload]: https://livereload.com/

### Code organization
#### Folders
- `articles/` - [GitHub Flavored Markdown][] files for blog posts
- `bin/twolfson.com` - Executable to start `twolfson.com` locally
- `config/` - Static configuration files and resource initialization
- `dist/` - Minified public files
- `server/` - Container for majority of app
    - `index.js` - Constructor for server that binds view and routing middlewares
    - `controllers/` - Business logic for server endpoints
    - `models/` - External data for the server to read in
    - `routes.js` - Attachements for `controllers/` to URLs
    - `views/` - HTML templates written in [Jade][]
- `public/` - CSS, images, and JavaScript for client side pages
- `test/` - Container for various test types
    - `integrations-tests/` - BDD tests written in [mocha][] that test server behavior
    - `perceptual-tests/` - [Perceptual diffs][] that detect visual changes across pages
    - `production-tests/` - BDD tests written in [Mocha][mocha] for [twolfson.com][twolfson.com]
    - `utils/` - Common utilities used for starting up/tearing down servers and making HTTP requests

[GitHub Flavored Markdown]: https://help.github.com/articles/github-flavored-markdown
[Jade]: https://jade-lang.com/
[mocha]: https://github.com/tj/mocha/
[Perceptual diffs]: https://www.youtube.com/watch?v=UMnZiTL0tUc

#### Files
- `CHANGELOG.md` - Record of changes that have happened on the server
- `README.md` - Documentation for the project
- `gulpfile.js` - Configuration for various tasks via [`gulp`][]

## Donating
Support this project and [others by twolfson][twolfson-projects] via [donations][twolfson-support-me].

<https://twolfson.com/support-me>

[twolfson-projects]: https://twolfson.com/projects
[twolfson-support-me]: https://twolfson.com/support-me

## License
Copyright (c) 2013-2014 Todd Wolfson

Licensed under the MIT license.
