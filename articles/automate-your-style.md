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

A code style guide is great for repository, team-wide, and possibly company-wide consistency. However, a written document is prone to errors:

- Humans are verifying styles are maintained
- Different teams might have different styles

For a while, there has been [JSLint][] and [JSHint][] but these focused on common mistakes (e.g. referenced an undeclared variable) rather than style issues (e.g. use a separate `var` for each variable).

```js
// More of a style discrepency than lint error
function a() {}
function b () {}
```
