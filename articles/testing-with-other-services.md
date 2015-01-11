{
  "title": "Testing with other services",
  "author": "Todd Wolfson",
  "date": "2015-01-11T15:26:10-0600",
  "keywords": "testing, services, http, eight-track, fixed-server, soa",
  "summary": "Introduction to using [eight-track](https://github.com/uber/eight-track) and [fixed-server](https://github.com/uber/fixed-server) for writing tests while handling other services."
}

Writing a library/application that talks to other services can be a pain to test and maintain. Tests should be as accurate as possible while being consistent and stable. This problem has been solved in [Ruby][] and [Python][] via [VCR][] and [Cassette][] respectively:

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
