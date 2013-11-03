{
  "title": "Website redesigned and refactored",
  "author": "Todd Wolfson",
  "date": "2013/11/02",
  "keywords": "twolfson.com, redesign, refactor",
  "summary": "Major refresh to website CSS and backend"
}

Visual and backend touchups to [twolfson.com][] have been a long time coming. However, over the last couple of weeks, I took the initiative to move to a website I would be proud of.

[twolfson.com]: /

Inside of this refactor:

- Upgraded from `grunt@0.3` to `grunt@0.4`
- Moved from [LESS][] to [SASS][]
- Moved from [Bootstrap][] to [inuit.css][]
- Normalized all CSS classes to [BEM][] classes
- Increased base font size to 18px for typographic readability
- Added activity section to [homepage][]
- Added related articles / projects section to each article
- Re-arranged [routes configuration][]
- Added [SEO][] for all pages and articles

[LESS]: http://lesscss.org
[SASS]: http://sass-lang.com/
[Bootstrap]: http://getbootstrap.com/2.3.2/
[inuit.css]: https://github.com/csswizardry/inuit.css
[BEM]: http://bem.info/
[homepage]: /
[routes configuration]: https://github.com/twolfson/twolfson.com/tree/5738a2943023daa371800b15227ad38c55fa43d6/lib
[SEO]: http://en.wikipedia.org/wiki/Search_engine_optimization

The outcome is something I am much more happy to work on and maintain

[![Before and after screenshot][before_after_thumb]][before_after_scaled]

[before_after_thumb]: /public/images/articles/website-redesign/before_after_thumb.png
[before_after_scaled]: /public/images/articles/website-redesign/before_after_scaled.png
