{
  "title": "UNLICENSE all the things",
  "author": "Todd Wolfson",
  "date": "2013/11/25",
  "keywords": "unlicense, license, legal, copyright, copyleft",
  "summary": "Choosing [UNLICENSE](http://unlicense.org/) over other licenses",
  "relatedArticles": ["Why I open source"]
}

[gifsockets][] are never-ending animated [GIFs][GIF] that can be used to send text and images between people.

Demo: http://console-log.2013.nodeknockout.com/

The [gifsockets][] project was initially developed during [Node Knockout][] but formalized in the following weeks.

[gifsockets]: https://github.com/twolfson/gifsockets-server
[GIF]: http://en.wikipedia.org/wiki/Graphics_Interchange_Format
[Node Knockout]: http://nodeknockout.com/

If you think you have heard of [gifsockets][] before, you have. [videlalvaro/gifsockets][] was the first implementation; written in [Clojure][] and not trivial to set up, especially without any [Clojure][] experience.

[videlalvaro/gifsockets]: https://github.com/videlalvaro/gifsockets
[Clojure]: http://en.wikipedia.org/wiki/Clojure

As a result of my poor experience, I decided to reimplement the concept in [JavaScript][]. It is built using [gif-encoder][], a fork of [gif.js][] for [node][] and [streams][], and [PhantomJS][] for [canvas][] preparation.

[JavaScript]: http://en.wikipedia.org/wiki/ECMAScript
[gif-encoder]: https://github.com/twolfson/gif-encoder
[gif.js]: http://jnordberg.github.io/gif.js/
[node]: http://nodejs.org/
[PhantomJS]: http://phantomjs.org/
[streams]: http://nodejs.org/api/stream.html
[canvas]: https://developer.mozilla.org/en-US/docs/HTML/Canvas

During the formalization process, a lot of smaller modules were built-out, the most interesting of which is [`gifsockets`][] which allows for using [`gifsockets`][] on any writable stream.

- [`gifsockets`][] - The heart of the `gifsockets project`, a mediator for subscribing any writable stream to newly written [GIF][] frames
- [`gifsockets-middleware`][] - Plug and play middlewares to set up a server with `gifsockets`
- [`gif-encoder`][] - A fork of [gif.js][] with stream support and is optimized for [node.js][] performance
- [`phantomjs-pixel-server`][] - A [PhantomJS][] server which takes text and converts it to an `rgba` array of pixels

[`gifsockets`]: https://github.com/twolfson/gifsockets
[`gifsockets-middleware`]: https://github.com/twolfson/gifsockets-middleware
[`gif-encoder`]: https://github.com/twolfson/gif-encoder
[`phantomjs-pixel-server`]: https://github.com/twolfson/phantomjs-pixel-server

More information can be found in the demo repository:

https://github.com/twolfson/gifsockets-server
