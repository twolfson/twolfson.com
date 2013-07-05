{
  "title": "Finding the perfect mix of code coverage",
  "author": "Todd Wolfson",
  "date": "2013/07/04"
}

[Code coverage][code-cov] is the percentage of lines of code that are touched by the test suite. In JS, some well known libs are [Istanbul][istanbul] and [JSCoverage][js-cov].

[code-cov]: https://en.wikipedia.org/wiki/Code_coverage
[istanbul]: https://github.com/gotwarlost/istanbul
[js-cov]: http://siliconforks.com/jscoverage/

## Why do I need the perfect mix?

A library can have no tests (0% coverage) or can have overlapping tests which cover every line (100% coverage) but neither is preferred.

In the 0% case, any change made has the possibility of breaking functionality and there is no automated way to verify it does not.

For 100% libraries, any change made requires updating at least 1 test case even if the feature is experimental or temporary.

To prevent too much manual testing and to reduce the pain of updating multiple tests for trivial changes, it is good to find the perfect mix for your library.

## What is the perfect mix?

The perfect mix has nothing to do with [code coverage][code-cov] at all. While it is a good metric to detect something breaking, API coverage is more practical.

API coverage is the percentage of public functions and the permutations of possible parameters which are tested.

It is possible to overtest here as well:

```
// Average use case
sum(2, 3);

// Far-fetched edge case
sum(null, null);
```

but instead of testing the lines of code touched, we are testing the likelihood/expectedness of parameters.