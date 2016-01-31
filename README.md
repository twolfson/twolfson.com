# twolfson.com [![Build status](https://travis-ci.org/twolfson/twolfson.com.png?branch=master)](https://travis-ci.org/twolfson/twolfson.com)

Repository for [http://twolfson.com/][]

This server is written on top of [express][], for routing and views, and [jojo][], for blog entries.

We use [`inuit.css`][] as our CSS framework to provide [OOCSS][] and [BEM][] conventions.

[http://twolfson.com/]: http://twolfson.com/
[express]: http://expressjs.com/
[jojo]: https://github.com/twolfson/jojo/
[`inuit.css`]: https://github.com/csswizardry/inuit.css
[OOCSS]: http://oocss.org/
[BEM]: http://bem.info/

## Getting started
The following steps will get a server running locally:

```bash
# Clone the repository
git clone https://github.com/twolfson/twolfson.com
cd twolfson.com

# Install dependencies and copy non-decrypted config
CONFIG_COPY_ONLY=TRUE npm install

# Run the server
npm start # should say 'Server running at http://localhost:8080/'
# For continuous development, use `nodemon`
# nodemon -x bin/twolfson.com
```

The server should be accessible via your browser at [http://localhost:8080/](http://localhost:8080/)

## Documentation
### Development
#### Configuration
Our secrets are stored in version control and managed via [SOPS][]. To update a secret, run:

```bash
# Opens file in `$EDITOR` and syncs secret to decrypted fiile
bin/edit-config-file.sh {{file}}
# Example: bin/edit-config-file.sh config/secret.enc.json`
```

To decrypt the current secrets in `config`, run:

```bash
# Decrypts all secret files in `config` (e.g. `secret.enc.json`)
bin/decrypt-config.sh
```

[SOPS]: https://github.com/mozilla/sops

#### CSS
CSS is compiled via [SASS][]. We depend on `ruby-sass@3.3.4` (requires [`gem`][] to be installed).

```bash
gem install sass -v 3.3.4
```

CSS compilation is run by default as part of the main `grunt` task but can be run standalone:

```bash
grunt # Compiles and watches CSS for changes
grunt css # Compile CSS once
```

[SASS]: http://sass-lang.com/
[`gem`]: https://rubygems.org/
[`grunt`]: http://gruntjs.com/

#### Images
Images are compiled into spritesheets via [`grunt-spritesmith`][]. These are run via a standalone [`grunt`][] task:

```bash
grunt sprite
```

[`grunt-spritesmith`]: https://github.com/Ensighten/grunt-spritesmith

#### JS
External JS libraries are managed via [`grunt-curl`][] and [`grunt-zip`][]. See [Low tech dependency management via grunt tasks][lo-fi-grunt].

As with CSS these are run by default as part of the main `grunt` task but can be run standalone:

```bash
grunt # Compiles and watches JS for changes
grunt js # Compile JS once
```

[`grunt-curl`]: https://github.com/twolfson/grunt-curl
[`grunt-zip`]: https://github.com/twolfson/grunt-zip
[lo-fi-grunt]: /2014-01-19-low-tech-dependency-management-via-grunt-tasks

### Code organization
#### Folders
- `articles/` - [GitHub Flavored Markdown][] files for blog posts
- `bin/twolfson.com` - Executable to start `twolfson.com` locally
- `config/` - Decrypted files from `config.env/`
- `config.enc/` - Static configuration files and resource initialization
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
[Jade]: http://jade-lang.com/
[mocha]: https://github.com/tj/mocha/
[Perceptual diffs]: http://www.youtube.com/watch?v=UMnZiTL0tUc

#### Files
- `CHANGELOG.md` - Record of changes that have happened on the server
- `README.md` - Documentation for the project
- `Gruntfile.js` - A [grunt][grunt] implementation for linting and minification.

[grunt]: http://gruntjs.com/

## Donating
Support this project and [others by twolfson][gratipay] via [gratipay][].

[![Support via Gratipay][gratipay-badge]][gratipay]

[gratipay-badge]: https://cdn.rawgit.com/gratipay/gratipay-badge/2.x.x/dist/gratipay.png
[gratipay]: https://www.gratipay.com/twolfson/

## License
Copyright (c) 2013-2014 Todd Wolfson

Licensed under the MIT license.
