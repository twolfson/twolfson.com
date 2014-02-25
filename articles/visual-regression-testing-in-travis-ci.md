{
  "title": "Visual regression testing in Travis CI",
  "author": "Todd Wolfson",
  "date": "2014-02-25T01:34:50-08:00",
  "keywords": "visual regression, perceptual diff, visual testing, screenshot testing, travis ci",
  "summary": "Guide to getting [visual regression testing/perceptual diffs](http://youtu.be/UMnZiTL0tUc) set up in [Travis CI](https://travis-ci.org/)"
}

[Visual regression tests/perceptual diffs][pdiff-presentation] are a way to test your website to verify the appearance stays consistent.

[pdiff-presentation]: http://youtu.be/UMnZiTL0tUc

// TODO: Add me (LICENSE page with one `d`, two `d's`, and diff; marked as actual, expected, diff)
![Example image of perceptual diff]()

Since the tests are visual, they require consistency across their screenshot environments. The most common problem is different fonts which can lead to alternate renderings. There are a few solutions for this:

- Use near-identical isolated environment to test environment (e.g. [Ubuntu][] [Vagrant][] for [Travis CI][])
- Use consistent isolated sub-environment in development and test environment (e.g [Vagrant][] for both)
    - If your test environment is virtualized, this will not work (e.g. [Travis CI][])
- Generate screenshots in remote environment (e.g. [Sauce Labs][], [BrowserStack][])

[Ubuntu]: http://www.ubuntu.com/
[Vagrant]: http://www.vagrantup.com/
[Travis CI]: https://travis-ci.org/
[Sauce Labs]: https://saucelabs.com/
[BrowserStack]: http://www.browserstack.com/

For this blog post, we will be walking through the first option, near-identical environments.

For [twolfson.com][], I use a home-grown screenshot + [`image-diff`][] script.

https://github.com/twolfson/twolfson.com/blob/3.21.0/test/perceptual-tests/twolfson.com_test.js

> At the initial time I wrote this, only `dpxdt` existed which was overkill for me.

There are a few existing solutions if you want something out of the box:

- https://github.com/facebook/huxley
- https://github.com/bslatkin/dpxdt
- https://github.com/BBC-News/wraith
- https://github.com/Huddle/PhantomCSS
- https://github.com/stefanjudis/grunt-photoBox

[twolfson.com]: http://twolfson.com/
[`image-diff`]: http://github.com/uber/image-diff
