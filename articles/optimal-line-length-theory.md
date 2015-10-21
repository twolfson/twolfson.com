{
  "title": "Optimal line length theory",
  "author": "Todd Wolfson",
  "date": "2013-09-08T00:00:00-0700",
  "keywords": "line length, typography, code, editor",
  "summary": "Experimenting with relative typographic line length limits applied to code.",
  "relatedArticles": ["Bringing vertical rhythm to code"]
}

In typography, there is the notion of an optimal line length; an ideal amount of characters per line to make a section of text easier/faster to read.

> For a single-column design measure should ideally lie between 40 & 80 characters. Many typographers consider the perfect measure to be 65 characters.

> http://en.wikipedia.org/wiki/Measure_%28typography%29

I have been considering to take on the experiment of applying this idea to code.

My execution would be placing a relative marker (e.g. ruler) 65 characters after the initial non-whitespace character. This would be used as a guide similar to the absolute [80 character limit][] that is frequently enforced.

[80 character limit]: http://en.wikipedia.org/wiki/Characters_per_line

[![Optimal line length sketch][continuous]][continuous]

[continuous]: /public/images/articles/optimal-line-length-theory/optimal-ruler-continuous.jpg

Initially, I [attempted a proof of concept plugin][optimal-lines] within Sublime Text but was stopped short by a lacking API; I was unable to draw outside of written characters. As a result, I took to [pixlr][] and whipped up some more mockups.

[optimal-lines]: https://github.com/twolfson/sublime-optimal-lines
[pixlr]: http://pixlr.com/editor/

# Highlighted sections
Concept: Highlight "good" areas to write code within

Reasoning: We want a guide to always present, even on good lines since it gives us something to aim for; pro-active rather than retro-active.

Flaws: The highlighting is overwhelming and draws attention away from code

[![Highlighted sections][highlighted]][highlighted]

[highlighted]: /public/images/articles/optimal-line-length-theory/optimal-highlight.jpg

# Colored ruler
Concept: Hint at level of scope to further visually separate indentation limitations.

[![Colored ruler][colored]][colored]

[colored]: /public/images/articles/optimal-line-length-theory/optimal-colored-ruler-continuous.jpg

# Double colored ruler
Concept: Provide a consistent even guide, similar to a track/rail.

[![Double colored ruler][double-colored]][double-colored]

[double-colored]: /public/images/articles/optimal-line-length-theory/optimal-lines-double-ruler.jpg

# Bordered content
Concept: Continuing with the rail concept but forcing focus to the content by blocking the outside (a la [blinders][]).

[![Bordered content][bordered]][bordered]

[blinders]: http://en.wikipedia.org/wiki/Blinders
[bordered]: /public/images/articles/optimal-line-length-theory/optimal-lines-bordered.jpg
