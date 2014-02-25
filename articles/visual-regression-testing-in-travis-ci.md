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

Unfortunately, since the tests themselves are visual, they require consistency between the screenshotting mechanisms. Even between Linux versions and Travis CI, consistency is not guaranteed due to different fonts. There are a few solutions for this:

- Run tests inside of near-identical isolated environment to test environment (e.g. Ubuntu Vagrant for Travis CI)
- Run tests inside of isolated sub-environment in development and test environment (e.g Vagrant for both)
    - This will not work if your test environment is virtualized (e.g. Travis CI)
- Generate screenshots in remote environment (e.g. [Sauce Labs][], [BrowserStack][]) and compare locally

[Sauce Labs]: https://saucelabs.com/
[Browser Stack]: http://www.browserstack.com/

For this blog post, we will be walking through the first option.
