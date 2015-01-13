{
  "title": "Testing with other services",
  "author": "Todd Wolfson",
  "date": "2015-01-11T15:26:10-0600",
  "keywords": "testing, services, http, eight-track, fixed-server, soa",
  "summary": "Introduction to using [eight-track](https://github.com/uber/eight-track) and [fixed-server](https://github.com/uber/fixed-server) for writing tests with other services."
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

We took this one step further and made an HTTP server instead of overwriting in-process logic.

# Pros
- No need to write mock responses by hand
- Responses are as accurate as the last time they were saved
- Works with distributed systems (e.g. `child processes`)
- To maintain/update fixtures: delete files and re-run tests
- Can base mock responses on real responses
    - See [hybrid example at the bottom](#mocked-yet-accurate-responses)

# Cons
- Some services require gymnastics to talk to
    - Some libraries hardcode URLs
    - Expiring data can require extra work

# Solution
We wrote 2 libraries that work together to solve this problem:

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

It works on the same principle as explained above; when a request is received, if there is a copy on disk, then send it back. Otherwise, make the request, save a copy to disk, and send it back. Here is an example of using [eight-track][] in testing:

```js
// Load in test dependencies
var http = require('http');
var eightTrack = require('eight-track');
var expect = require('chai').expect;
var request = require('request');

// Start tests
describe('A request to our server', function () {
  // Create a temporary eight-track server (forwards requests to twolfson.com)
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
//   saves `data/twolfson-eight-track/GET_%252F_0a89...json` to disk
//   replies with original response

// Second run of `npm test`
//    finds and replies with cached response under `data/twolfson-eight-track/GET_%252F_0a89...json`
```

> Hosted example can be found at https://gist.github.com/twolfson/c12a75a018ce0d1b2b12

# Creating static responses
[fixed-server][] is the fixture equivalent for HTTP responses; define all responses in one file, decide which responses to use on a per-test basis. In the example below, we will test against our server sending back both a valid (`200`) and invalid (`500`) response from the same location.

```js
// Load in dependencies
var expect = require('chai').expect;
var FixedServer = require('fixed-server');
var httpUtils = require('request-mocha')(require('request'));

// Create a test server factory
// DEV: For logical consistency, we use keys which represent the route
var FixedApi = new FixedServer({port: 1337});
FixedApi.addFixtures({
  'GET 200 /': {
    method: 'get',
    route: '/',
    response: function (req, res) {
      res.send('Hello World');
    }
  },
  'GET 500 /': {
    method: 'get',
    route: '/',
    response: function (req, res) {
      res.status(500).send('An error has occurred');
    }
  }
});

// Start tests
describe('A request to a proxy server', function () {
  describe('with an operating backend', function () {
    // Launch a FixedApi hosting a 200 route
    FixedApi.run(['GET 200 /']);
    httpUtils.save('http://localhost:1337/');

    // Verify against our 200 route
    it('receives a 200 response', function () {
      expect(this.res).to.have.property('statusCode', 200);
    });
  });

  describe('with an non-functional backend', function () {
    // Launch a FixedApi hosting a 500 route
    FixedApi.run(['GET 500 /']);
    httpUtils.save('http://localhost:1337/');

    // Verify against our 500 route
    it('receives a 500 response', function () {
      expect(this.res).to.have.property('statusCode', 500);
    });
  });
});
```

> Hosted example can be found at https://gist.github.com/twolfson/4dfa7dcdcb42b592c048

# Mocked yet accurate responses
Sometimes we want to test against data in hard to generate scenarios (e.g. a search is empty, missing property). We can combine [eight-track][] and [fixed-server][] to receive normal data, then modify it for our fixture.

```js
// Load in dependencies
var eightTrack = require('eight-track');
var expect = require('chai').expect;
var FixedServer = require('fixed-server');
var httpUtils = require('request-mocha')(require('request'));

// Create a test server factory with modifying endpoints
var githubEightTrack = eightTrack({
  url: 'https://api.github.com',
  fixtureDir: 'data/github-eight-track'
});
var FixedGithub = new FixedServer({port: 1337});
FixedGithub.addFixtures({
  'GET 200 /repos/uber/eight-track': {
    method: 'get',
    route: '/repos/uber/eight-track',
    // Playback directly with eight-track
    response: githubEightTrack
  },
  'GET 200 /repos/uber/eight-track#no-watchers': {
    method: 'get',
    route: '/repos/uber/eight-track',
    response: function (localReq, localRes) {
      // Forward request via eight-track
      githubEightTrack.forwardRequest(localReq, handleResponse);
      function handleResponse(err, externalRes, externalBody) {
        // If there was an error, throw it
        if (err) {
          throw err;
        }

        // Otherwise, extract the JSON and modify the watchers
        var repoInfo = JSON.parse(externalBody);
        repoInfo.watchers = 0;
        localRes.send(repoInfo);
      }
    }
  }
  // We can add the 500 response from the previous example
  //   for entirely fake data
});

// Start our tests
describe('A GitHub repo', function () {
  describe('is very popular', function () {
    // Launch a FixedServer with real data
    FixedGithub.run(['GET 200 /repos/uber/eight-track']);
    httpUtils.save({
      url: 'http://localhost:1337/repos/uber/eight-track',
      headers: {
        'User-Agent': 'node-request'
      }
    });

    // Make assertions about request
    it('has some stargazers', function () {
      expect(this.err).to.equal(null);
      expect(this.res.statusCode).to.equal(200);
      expect(JSON.parse(this.body).watchers).to.be.at.least(1);
    });
  });

  describe('is very young', function () {
    // Launch a FixedServer hosting with a modified response
    FixedGithub.run(['GET 200 /repos/uber/eight-track#no-watchers']);
    httpUtils.save({
      url: 'http://localhost:1337/repos/uber/eight-track',
      headers: {
        'User-Agent': 'node-request'
      }
    });

    // Make assertions about request
    it('has no watchers', function () {
      expect(this.err).to.equal(null);
      expect(this.res.statusCode).to.equal(200);
      expect(JSON.parse(this.body).watchers).to.equal(0);
    });
  });
});
```

> Hosted example can be found at https://gist.github.com/twolfson/d00e379cfea0860a175b
