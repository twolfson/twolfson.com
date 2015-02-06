{
  "title": "Automate your style",
  "author": "Todd Wolfson",
  "date": "2015-02-06T02:48:44-0600",
  "keywords": "automate, style, lint, hint, jslint, jshint, jscs, eslint, esformatter",
  "summary": "Introduction to automatically checking and formatting code style."
}

// TODO: Move to actual image

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

Instead of writing up a style guide and making the engineer relearn it, we added [jscs][] to the project and the results were instant. The engineer got instant feedback via the test suite and all future PR comments were focused on actual issues rather than style discrepencies.

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
- [JSHint][] - [JSLint][] replacement with more relaxed rules and a few style options
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
