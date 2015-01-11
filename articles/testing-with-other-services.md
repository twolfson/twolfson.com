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
[Node.js]: http://nodejs.org/

```
GET /info
  -> If /info is stored on disk
```

To solve this problem, we wrote two libraries:

-

# Pros
