{
  "title": "Automate your style",
  "author": "Todd Wolfson",
  "date": "2015-02-06T02:48:44-0600",
  "keywords": "automate, style, lint, hint, jslint, jshint, jscs, eslint, esformatter",
  "summary": "Introduction to automatically checking and formatting code style."
}

// TODO: Show proposition upfront

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

At Uber, I was working on a team with another engineer and we had a mutually consistent of coding style. Then, 2 more engineers joined and were coming from very different projects. The adjustment period was painful; one of the first PRs was way off base from the repo's style. However, it wasn't the engineer's fault. We had never rigorously defined a style guide and to force him to relearn our bespoke style from memorization would be tedious for everyone.

We grabbed [jscs][] which I had been eyeballing for a few months and the results were instant. The engineer was able to get instant feedback via the test suite and all my PR comments were focused on actual issues rather than noise about style discrepencies.

A code style guide is great for repository, team-wide, and possibly company-wide consistency. However, a written document is prone to errors:

- Humans are verifying styles are maintained
- Different teams might have different styles

For a while, there has been [JSLint][] and [JSHint][] but these focused on common mistakes (e.g. referenced an undeclared variable) rather than style issues (e.g. use a separate `var` for each variable).

```js
// More of a style discrepency than lint error
function a() {}
function b () {}
```
