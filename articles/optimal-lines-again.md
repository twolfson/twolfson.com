{
  "title": "Optimal lines again",
  "author": "Todd Wolfson",
  "date": "2013-11-26T00:00:00-0800",
  "keywords": "optimal, relative, line, length, typography, code",
  "summary": "Making [relative line length limits](/2013-09-08-optimal-line-length-theory) usable",
  "relatedArticles": ["Optimal line length theory"]
}

I am making progress with respect to [relative line lengths inside of code][sublime-optimal-lines].

[sublime-optimal-lines]: https://github.com/twolfson/sublime-optimal-lines

[![Relative line length](/public/images/articles/optimal-lines.png)][sublime-optimal-lines]

A few months ago, I had the idea to apply the typographic concept of
ideal characters per line and [begin applying it to code][optimal-lines-v1].

[optimal-lines-v1]: /2013-09-08-optimal-line-length-theory

![Proof of concept](/public/images/articles/optimal-lines-poc.png)

Unfortunately, the concept was rough around the edges and I struggled at
making it more appealing. A few weeks later, I took the next iteration
which is what you see at the top.

There is a piece that is still missing; as you type code, you magically hit
a limit without any forewarning. I attempted to use a ruler for this but
when you switched lines, it got frustrating to watch it jump around.

![Ruler jump](/public/images/articles/optimal-lines-ruler.gif)

I have a few thoughts lying around on how to solve this but the road ahead
is a slow and viscous one.
