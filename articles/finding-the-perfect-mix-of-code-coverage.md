{
  "title": "Finding the perfect mix of code coverage",
  "author": "Todd Wolfson",
  "date": "2013/07/04"
}

[Code coverage][code-cov] is the percentage of lines of code that are touched over the course of all your tests. In JS, some well known ones are [Istanbul][istanbul] and [JSCoverage][js-cov].

[code-cov]: https://en.wikipedia.org/wiki/Code_coverage
[istanbul]: https://github.com/gotwarlost/istanbul
[js-cov]: http://siliconforks.com/jscoverage/

A library can have no tests (0% coverage) or can be over-tested (100% coverage with overlap) but neither is preferred. In the 0% case, any change made has the possibility of breaking functionality and there is no automated way to verify it does not. For 100% libraries, any change made requires updating at least 1 test case even if the feature is experimental or temporary. This is why you need to find the perfect mix for your code base.