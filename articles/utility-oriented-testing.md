{
  "title": "Utility oriented testing",
  "author": "Todd Wolfson",
  "date": "2016-11-19T18:12:18-0600",
  "keywords": "utility, oriented, testing",
  "summary": "How to make tests DRY without becoming impractical"
}

I have been using the following coding style for a while:

```js
// Load in our dependencies
var expect = require('chai').expect;
var httpUtils = require('./utils/http');
var serverUtils = require('./utils/server');

// Define our tests
describe('A request to GET /', function () {
  // Start our server, make our HTTP request, and save its info to `this`
  serverUtils.run();
  httpUtils.save(serverUtils.getUrl('/'));

  // Perform our assertions
  it('has no errors', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(200);
  });
  it('receives expected content', function () {
    expect(this.body).to.contain('Hello World!');
  });
});
```

Without utilities this would look like:

```js
// Load in our dependencies
var expect = require('chai').expect;
var request = require('request');
var server = require('../server/index');

// Define our tests
describe('A request to GET /', function () {
  // Start our server
  // DEV: This is an over simplification of server setup/teardown but everyone has a different way
  before(function serverUtilsRun () {
    server.listen(8080);
  });
  before(function cleanupServerUtilsRun () {
    server.close();
  });

  // Make our HTTP request and save its info to `this`
  before(function httpUtilsSave (done) {
    var that = this;
    request('http://localhost:8080/', function handleRequest (err, res, body) {
      that.err = err;
      that.res = res;
      that.body = body;
      done();
    });
  });
  after(function cleanupHttpUtilsSave () {
    delete this.err;
    delete this.res.statusCode;
    delete this.body;
  });

  // Perform our assertions
  it('has no errors', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(200);
  });
  it('receives expected content', function () {
    expect(this.body).to.contain('Hello World!');
  });
});

```

So why does this work? Mocha has a `this` context which is shared by `before`, `after`, and `it`

Session oriented testing:

This becomes tedious when we have repetition among tests on a large API (e.g. 10 HTTP endpoints with 4 tests). I've been exploring solutions to that by wrapping top level `describes` and calling it `scenario`:

https://gist.github.com/twolfson/1ddf42a41bffefb8c2f298c082e4a337

https://gist.github.com/twolfson/6b2919b9b83dc54c270a9c89db973288

I recommend against using utilities for `it` tests; it's implicit that the utilities are for `before`/`after` actions only. As a result, when we read compare the CLI output to the code, it's hard to identify where the test is coming from.

I used to publish packages for these ([request-mocha][], [mocha-fixture-dir][]). However, I have found that utilities change frequently enough that it's impractical. Instead I will typically copy/paste among repos. Here are some samples from my latest project:

- https://github.com/twolfson/multi-image-mergetool/tree/1.14.5/test/utils
- https://github.com/twolfson/multi-image-mergetool/tree/1.14.5/test/browser/utils
- https://github.com/twolfson/multi-image-mergetool/tree/1.14.5/test/server/utils

[request-mocha]: https://github.com/uber-archive/request-mocha
[mocha-fixture-dir]: https://github.com/twolfson/mocha-fixture-dir
