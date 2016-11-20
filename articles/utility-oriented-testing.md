{
  "title": "Utility oriented testing",
  "author": "Todd Wolfson",
  "date": "2016-11-19T18:12:18-0600",
  "keywords": "utility, oriented, testing",
  "summary": "How to make tests DRY without becoming impractical"
}

I have been using the following coding style in tests for a while:

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
  // DEV: This is an over simplification of server setup/teardown
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

For those curious about how this works, Mocha has a `this` context which is shared by `before`, `after`, and `it`.

We can take this coding style further by supporting chaining (e.g. here is how I test things like CSRF):

```js
// Load in our dependencies
var expect = require('chai').expect;
var httpUtils = require('./utils/http');
var serverUtils = require('./utils/server');

// Define our tests
describe('A request to POST /', function () {
  // Start our server
  serverUtils.run();

  describe('with a CSRF token', function () {
    // Make our HTTP request
    // DEV: `session.init()` will create a cookie jar
    // DEV: `session.save()` will use said cookie jar
    // DEV: See htmlForm and expectedStatusCode definitions here
    //   https://github.com/twolfson/twolfson.com/blob/3.102.0/test/utils/http.js#L15-L66
    httpUtils.session.init()
      .save(serverUtils.getUrl('/'))
      .save({
        method: 'POST',
        url: serverUtils.getUrl('/')
        htmlForm: true,
        expectedStatusCode: 200
      });

    // Perform our assertions
    it('is successful', function () {
      // Asserted by `expectedStatusCode`
    });
  });

  describe('without a CSRF token', function () {
    // Make our HTTP request
    httpUtils.session.init()
      .save({
        method: 'POST',
        url: serverUtils.getUrl('/')
        expectedStatusCode: 400
      });

    // Perform our assertions
    it('is rejected', function () {
      // Asserted by `expectedStatusCode`
    });
  });
});
```

I've been exploring solutions to reduce repetition among tests (and even add required tests) by wrapping top level `describes` as another function (e.g. `scenario`):

https://gist.github.com/twolfson/1ddf42a41bffefb8c2f298c082e4a337

https://gist.github.com/twolfson/6b2919b9b83dc54c270a9c89db973288

# Lessons learned and further reading
I recommend against using utilities for `it` tests; it's implicit that the utilities are for `before`/`after` actions only. As a result, when we read compare the CLI output to the code, it's hard to identify where the test is coming from.

Example: https://github.com/twolfson/spritesheet-templates/blob/7.2.0/test/css_test.js#L35-L40

I used to publish packages for these ([request-mocha][], [mocha-fixture-dir][]). However, I have found that utilities change frequently enough that it's impractical to maintain. Instead I will typically copy/paste among repos. Here are some samples from my latest project:

- https://github.com/twolfson/multi-image-mergetool/tree/1.14.5/test/utils
- https://github.com/twolfson/multi-image-mergetool/tree/1.14.5/test/browser/utils
- https://github.com/twolfson/multi-image-mergetool/tree/1.14.5/test/server/utils

[request-mocha]: https://github.com/uber-archive/request-mocha
[mocha-fixture-dir]: https://github.com/twolfson/mocha-fixture-dir
