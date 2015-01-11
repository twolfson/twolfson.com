{
  "title": "Testing with other services",
  "author": "Todd Wolfson",
  "date": "2015-01-11T15:26:10-0600",
  "keywords": "testing, services, http, eight-track, fixed-server, soa",
  "summary": "Introduction to using [eight-track](https://github.com/uber/eight-track) and [fixed-server](https://github.com/uber/fixed-server) for writing tests while handling other services."
}

A library/application that talks to other services should have tests that are accurate, consistent, and stable. This problem has been solved in [Ruby][] and [Python][] via [VCR][] and [Cassette][] respectively:

[Ruby]: https://www.ruby-lang.org/en/
[Python]: http://www.python.org/
[VCR]: https://github.com/vcr/vcr
[Cassette]: https://github.com/uber/cassette

```
// In our process, overwrite the basic HTTP handler to use this logic:
GET /info
  -> If /info is stored on disk, send saved response
  -> Else
    -> Request /info from original server
    -> Save /info response to disk
    -> Forward /info to original request
```

At Uber, we took this one step further and made an HTTP server instead of overwriting in-process logic.

# Pros
- No need to write all mocks by hand
- Responses are as accurate as last time they were saved
- Works with distributed systems (e.g. `child processes`)
- To maintain/update fixtures, delete files and re-run tests
- Can base test mocks off of real responses
    - See `fixed-server` example later on
        - TODO: Document me and verify we have it
        - TODO: Link me

# Cons
- Some services require gymnastics to talk to
    - Some libraries hardcode URLs
    - Expiring data can require extra work

# Solution
Our server was written in 2 parts:

- [eight-track][], a [connect][] middleware that caches HTTP responses to disk
- [fixed-server][], an HTTP server factory for starting a server with pre-defined responses on per-test basis
    - Useful for testing bad/unexpected responses (e.g. 403, 500)

[eight-track]: https://github.com/uber/eight-track
[connect]: https://github.com/senchalabs/connect/
[fixed-server]: https://github.com/uber/fixed-server

# Fixturing HTTP responses
[eight-track][] is a middleware that can be used with any HTTP server (e.g. node's [http][], [express][]).

[http]: http://nodejs.org/api/http.html#http_http_createserver_requestlistener
[express]: http://expressjs.com/

It works on the same principle as explained above; when a request is received, if it is saved on disk, then send the result. Otherwise, make the request, save the result to disk, and send the result from disk. Here is an example of using [eight-track][] in testing:

```js
// Load in test dependencies
var http = require('http');
var eightTrack = require('eight-track');
var expect = require('chai').expect;
var request = require('request');

// Start tests
describe('A request to our server', function () {
  // Create temporary eight-track server (forwards requests to twolfson.com)
  before(function startEightTrack () {
    this.twolfsonEightTrack = http.createServer(eightTrack({
      url: 'http://twolfson.com',
      fixtureDir: 'data/twolfson-eight-track'
    }));
    this.twolfsonEightTrack.listen(1337);
  });
  after(function cleanup (done) {
    this.twolfsonEightTrack.close(done);
    delete this.twolfsonEightTrack;
  });

  // Make request to eight-track server (could proxy to twolfson.com)
  before(function makeRequestToServer (done) {
    var that = this;
    request({
      // Inside your application, it should be configured to point
      //   to an eight-track server when testing
      url: 'http://localhost:1337/'
    }, function handleRes (err, res, body) {
      // Save body and callback with error
      that.body = body;
      done(err);
    });
  });

  // Make assertions about request
  it('receives the expected content', function () {
    expect(this.body).to.contain('Todd Wolfson');
  });
});

// First run of `npm test`
//   saves `/data/twolfson-eight-track/GET_%252F_0a89...json` to disk
//   replies with original response

// Second run of `npm test`
//    finds and replies with cached response under `/data/twolfson-eight-track/GET_%252F_0a89...json`
```

*Hosted example can be found at [https://gist.github.com/twolfson/c12a75a018ce0d1b2b12][]*

[https://gist.github.com/twolfson/c12a75a018ce0d1b2b12]: https://gist.github.com/twolfson/c12a75a018ce0d1b2b12
