{
  "title": "Automate your style",
  "author": "Todd Wolfson",
  "date": "2015-02-06T02:48:44-0600",
  "keywords": "automate, style, lint, hint, jslint, jshint, jscs, eslint, esformatter",
  "summary": "Introduction to automatically checking and formatting code style."
}

A code style guide is great for repository, team-wide, and possibly company-wide consistency. However, a written document is prone to errors:

- Humans are verifying styles are maintained
- Different teams might have different styles

For a while, there has been [JSLint][] and [JSHint][] but these focused on common mistakes (e.g. referenced an undeclared variable) rather than style issues (e.g. use a separate `var` for each variable).

```js
// More of a style discrepency than lint error
function a() {}
function b () {}
```
