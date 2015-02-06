{
  "title": "Automate your style",
  "author": "Todd Wolfson",
  "date": "2015-02-06T02:48:44-0600",
  "keywords": "automate, style, lint, hint, jslint, jshint, jscs, eslint, esformatter",
  "summary": "Introduction to automatically checking and formatting code style."
}

// TODO: Move to actual image
// TODO: Consider http://matplotlib.org/xkcd/examples/showcase/xkcd.html

```
 Comments on PRs about style

20 | --------\
   |          |
   |          |
   |          |
   |          |
 1 |          \--\
 0 |              -------
   -----------------------
            |
   Introduction of `jscs`

          Time
```

The above graph is of an experience I had while leading a team at Uber. We added 2 new engineers from projects with different languages and styles. The first PR was good code but very inconsistent with the existing coding practices.

Instead of writing up a style guide and making the engineers memorize it, we added [jscs][] to the project and instantly fixed everything. The engineer got continuous feedback for style conflicts via the test suite and all future PR comments were focused on actual issues rather than style discrepencies.

[jscs]: https://github.com/jscs-dev/node-jscs

# Overview
There are 2 categories for linting/style checking tools: *validators* and *formatters*.

A *validator* scans through the code and points out issues. For example:

```js
Extra comma following the final element of an array or object literal at Gruntfile.js :
    11 |      all: {
    12 |        files: {
    13 |          'dist/css/index.min.css': 'public/css/index.scss',
-------------------------------------------------------------------^
    14 |        },
    15 |        options: {
```

A *formatter* automatically adjusts the code. For example, it converts:

```js
var hello = 'world',
    goodbye = 'moon';
```

to:

```js
var hello = 'world';
var goodbye = 'moon';
```

# Validators
*Validators* have been around for much longer and as a result, have more features and are less error-prone.

- [JSLint][] - One of the older linters, focused on programming mistakes
    - Website: http://www.jslint.com/
    - Options: http://www.jslint.com/lint.html#options
- [JSHint][] - [JSLint][] replacement with relaxed rules and style options
    - Website: http://jshint.org/
    - Options: http://jshint.com/docs/options/
- [ESLint][] - Plugin based linter with a bunch of style options
    - Website: http://eslint.org/
    - Options: http://eslint.org/docs/rules/
- [jscs][] - Focuses on style options with a large comprehensive list
    - Website: http://jscs.info/
    - Options: http://jscs.info/rules.html

[JSLint]: http://www.jslint.com/
[JSHint]: http://jshint.org/
[ESLint]:  http://eslint.org/

## Wrappers
At the time of writing, most of these tools have options unique to themselves. As a result, it is becoming common to write wrappers to perform validation:

- [standard][] - Globally installed style checker that relies on its internal set of configurations
    - Website: https://github.com/feross/standard
- [fashion-show][] - Per-fork configured style checker
    - Website: https://github.com/indexzero/fashion-show
- [twolfson-style][] - Personal flavor with lint-only command `precheck`
    - This was inspired by past conversations at Uber and [lint-trap][]
    - Website: https://github.com/twolfson/twolfson-style
- [lint-trap][] - Uber flavored linter with custom text editor integrations
    - Website: https://github.com/uber/lint-trap

[standard]: https://github.com/feross/standard
[fashion-show]: https://github.com/indexzero/fashion-show
[twolfson-style]: https://github.com/twolfson/twolfson-style
[lint-trap]: https://github.com/uber/lint-trap

# Formatters
*Formatters* are an emerging set of tools and as a result, have less features.

- [escodegen][] - Older formatter with options for linting and style
    - Website: https://github.com/estools/escodegen
    - Options: https://github.com/estools/escodegen/wiki/API
- [fixmyjs][] - Wraps [escodegen][] to present fixes for common JSHint issues
    - Website: https://github.com/jshint/fixmyjs
    - Options: https://github.com/jshint/fixmyjs/tree/b3544129#options
- [esformatter][] - Plugin based formatter with a growing set of plugins
    - Website: https://github.com/millermedeiros/esformatter
    - Options: https://github.com/millermedeiros/esformatter/blob/v0.4.3/lib/preset/default.json
    - Plugins: https://github.com/millermedeiros/esformatter/wiki/Plugins
    - Unfortunately, the options require knowledge of the [SpiderMonkey AST][]

[escodegen]: https://github.com/estools/escodegen
[fixmyjs]: https://github.com/jshint/fixmyjs
[esformatter]: https://github.com/millermedeiros/esformatter
[SpiderMonkey AST]: https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
