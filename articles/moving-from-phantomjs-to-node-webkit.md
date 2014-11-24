{
  "title": "Moving from PhantomJS to node-webkit",
  "author": "Todd Wolfson",
  "date": "2014-11-22T17:04:40-0800",
  "keywords": "phantomjs, node-webkit, screenshot, perceptual diff, visual regression",
  "summary": "Transferring visual regression tests from [PhantomJS](http://phantomjs.org/) to [node-webkit](https://github.com/rogerwang/node-webkit) for better `node_modules/` support and more accurate screenshots."
}

My website has a [test suite with visual regression tests][visual-regression-tests]; screenshot different webpages and compares against an expected set of images:

https://github.com/twolfson/twolfson.com/tree/3.39.0/test/perceptual-tests/expected_screenshots

[visual-regression-tests]: http://twolfson.com/2014-02-25-visual-regression-testing-in-travis-ci

This weekend, I switched it from [PhantomJS][] to [node-webkit][] and am happy with the results:

[PhantomJS]: http://phantomjs.org/
[node-webkit]: https://github.com/rogerwang/node-webkit
[atom-shell]: https://github.com/atom/atom-shell

[![Comparison][comparison-img]][comparison-img]

[comparison-img]: /public/images/articles/moving-from-phantomjs-to-node-webkit/comparison.png

# Benefits
- `node_modules/` always work (e.g. no `process` is `undefined` issues)
- `node_modules/` are automatically resolved via `require`
- Rendering is more accurate (e.g. web fonts load)

# Downsides
- `node-webkit` has a slow startup time
- Need to define `index.html` and `package.json` to load JS in `node-friendly` context
    - This can be worked around with a script wrapper (e.g. build a node module for it)

# Gotchas
- There were concurrency issues, we had to throttle it to 2 screenshot runs at the same time
    - Otherwise, we would see white screens sometimes
- `node-webkit@0.10.5` would occasionally draw an underline for a link when all others didn't have one
    - Upon upgrading to `node-webkit@0.11.1`, these issues went away
- Need to use `Xvfb` to exceed maximum desktop screenshot size (e.g. `2000` height on `1080` tall resolution)
- Need to keep on using [Vagrant][] to match [Travis CI][] renders

[Vagrant]: http://vagrantup.com/
[Travis CI]: https://travis-ci.org/

# Why not [atom-shell][]?
My first attempt was with [atom-shell][]. However, there was an issue with screenshotting in the latest release (`0.19.3`):

https://github.com/atom/atom-shell/issues/847

The latest version that would capture screenshots (`0.17.2`) didn't have a mechanism for reading data from a website when `node-integration` was disabled. This was disabled to verify the website was accurate as possible.

# Why not [Selenium][]?
Selenium is definitely the most accurate set of screenshots. However, setup and installation is not as easy as [`node-webkit`][]. Additionally, I wanted to verify that [`node-webkit`][] was a viable platform for future scripts.

[Selenium]: http://www.seleniumhq.org/

# Links
- `node-webkit` screenshot script
    - https://github.com/twolfson/twolfson.com/blob/3.40.0/test/perceptual-tests/node-webkit_scripts/screenshot.js
- Perceptual diff test suite
    - https://github.com/twolfson/twolfson.com/blob/3.40.0/test/perceptual-tests/twolfson.com_test.js
