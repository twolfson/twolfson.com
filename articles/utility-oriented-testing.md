{
  "title": "Utility oriented testing",
  "author": "Todd Wolfson",
  "date": "2016-11-19T18:12:18-0600",
  "keywords": "utility, oriented, testing",
  "summary": "How to make tests DRY without becoming impractical"
}

I have been using the following coding style for a while:

```js
```

I used to publish packages for these ([request-mocha][], [mocha-fixture-dir][]). However, I have found that utilities change frequently enough that it's impractical. Instead I will typically copy/paste among repos. Here are some samples from my latest project:

- https://github.com/twolfson/multi-image-mergetool/tree/1.14.5/test/utils
- https://github.com/twolfson/multi-image-mergetool/tree/1.14.5/test/browser/utils
- https://github.com/twolfson/multi-image-mergetool/tree/1.14.5/test/server/utils

[request-mocha]: https://github.com/uber-archive/request-mocha
[mocha-fixture-dir]: https://github.com/twolfson/mocha-fixture-dir
