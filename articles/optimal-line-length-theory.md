{
  "title": "Optimal line length theory",
  "author": "Todd Wolfson",
  "date": "2013/09/08"
}

In typography, there is the notion of an optimal line length.

> For a single-column design measure should ideally lie between 40 & 80 characters. Many typographers consider the perfect measure to be 65 characters.
> &nbsp;
> http://en.wikipedia.org/wiki/Measure_%28typography%29

While I have not yet applied this notion to my blog (it's on my TODO list), I have been toying with the idea of applying it to my code.

The concept is to place a relative marker (e.g. ruler) 65 characters after the initial non-whitespace character. This would be used as a guide similar to the absolute [80 character limit][] that is frequently enforced.

[80 character limit]: http://en.wikipedia.org/wiki/Characters_per_line

[![Optimal line length sketch][continuous]][continuous]

[continuous]: /public/images/articles/optimal-line-length-theory/optimal-ruler-continuous.jpg

I initially attempted a proof of concept plugin within Sublime Text but found that it lacked the ability to draw outside of written characters. As a result, I took to [pixlr][] and whipped up some more mockups.

[pixlr]: http://pixlr.com/editor/