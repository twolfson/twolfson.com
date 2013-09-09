{
  "title": "Optimal line length theory",
  "author": "Todd Wolfson",
  "date": "2013/09/08"
}

In typography, there is the notion of an optimal line length.

> For a single-column design measure should ideally lie between 40 & 80 characters. Many typographers consider the perfect measure to be 65 characters.

> http://en.wikipedia.org/wiki/Measure_%28typography%29

While I have not yet applied this notion to my blog (it's on my TODO list), I have been toying with the idea of applying it to my code.

The concept is to place a relative marker (e.g. ruler) 65 characters after the initial non-whitespace character. This would be used as a guide similar to the absolute [80 character limit][] that is frequently enforced.

[80 character limit]: http://en.wikipedia.org/wiki/Characters_per_line

[![Optimal line length sketch][continuous]][continuous]

[continuous]: /public/images/articles/optimal-line-length-theory/optimal-ruler-continuous.jpg

I initially [attempted a proof of concept plugin][optimal-lines] within Sublime Text but found that it lacked the ability to draw outside of written characters. As a result, I took to [pixlr][] and whipped up some more mockups.

[optimal-lines]: https://github.com/twolfson/sublime-optimal-lines
[pixlr]: http://pixlr.com/editor/

Highlighted sections. Unforunately, this doesn't work since the highlighting is overwhelming. We want a guide to always present, even on good lines since it gives us something to aim for; pro-active rather than retro-active.

[![Highlighted sections][highlighted]][highlighted]

[highlighted]: /public/images/articles/optimal-line-length-theory/optimal-highlight.jpg

Colored ruler, to hint at level of scope to visually separate indexes.

[![Colored ruler][colored]][colored]

[colored]: /public/images/articles/optimal-line-length-theory/optimal-colored-ruler-continuous.jpg

Double colored ruler, attempting to provide a consistent even guide, similar to a track/rail.

[![Double colored ruler][double-colored]][double-colored]

[double-colored]: /public/images/articles/optimal-line-length-theory/optimal-lines-double-ruler.jpg

Bordered content, continuing with the rail concept but forcing focus to the content by blocking the outside.

[![Bordered content][bordered]][bordered]

[bordered]: /public/images/articles/optimal-line-length-theory/optimal-lines-bordered.jpg

I am still limited by Sublime's API but contemplate creating a proof of concept via [Brackets][].

[Brackets]: http://brackets.io/
