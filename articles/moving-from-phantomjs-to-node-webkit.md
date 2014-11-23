{
  "title": "Moving from PhantomJS to node-webkit",
  "author": "Todd Wolfson",
  "date": "2014-11-22T17:04:40-0800",
  "keywords": "phantomjs, node-webkit, screenshot, perceptual diff, visual regression",
  "summary": "Moving my visual regression tests from [PhantomJS](http://phantomjs.org/) to [node-webkit](https://github.com/rogerwang/node-webkit) for better `node_modules/` support and more accurate screenshots."
}

My website has a test suite that involves visual regression tests; screenshot different webpages and compares against an expected set:

https://github.com/twolfson/twolfson.com/tree/3.39.0/test/perceptual-tests/expected_screenshots

> For those of you interested in getting this set up, see http://twolfson.com/2014-02-25-visual-regression-testing-in-travis-ci

In the past, I was using [PhantomJS][] which works great but has some downsides:

- Doesn't always play nice with `node_modules/` (e.g. lacks `process` variable)
- Rendering not always accurate
    - Doesn't load webfonts properly
    - Sometimes CSS rules are screwy (e.g. `border-radius`)

[PhantomJS]: http://phantomjs.org/
[node-webkit]: https://github.com/rogerwang/node-webkit

This doesn't stop the test suite from running but can lead to frustration/unnecessary gotchas. Earlier this month, I had an ephiphany that I could start using [node-webkit][]/[atom-shell][] over [PhantomJS][] to fix these problems.

This weekend, I took my first shot and here are the results:


# Why?
## Over phantomjs
- Get access to `node_modules/` without needing to bend over backwards (e.g. limit selection, pre-process scripts)
- More accurate rendering (e.g. web fonts load)

## Over atom-shell
- Buffering was broken in latest version (link to issue)
- In latest working version (`0.17.2`?), it didn't have a way to talk directly to a page with a disabled `node` context
    - We disabled the `node` context for accuracy purposes

## Downsides
- Slow startup time
- Need to defined `index.html` and `package.json`
    - This can be worked around with a script wrapper (e.g. build a node module for it)

# Gotchas
- Need to limit scripts to not be very concurrent
    - Would occasionally yield white screens otherwise
- 0.10.5 had a strange bug that would occasionally render an underline on a link when all others don't have one
