{
  "title": "Design for developers",
  "author": "Todd Wolfson",
  "date": "2015-12-28T21:08:10-0600",
  "keywords": "design, developers, engineers",
  "summary": "An introduction to design, targeted at developers."
}

**TODO: Consider images for "What is design?" section**
**TODO: Consider image for "Grid" section**
**TODO: Consider adding more Further reading items**

**TODO: Add sections like "Not covered in this article"**
**Kerning**
**Optimal characters per line**
**Screenshot with context**
**Style guide**
**Mood board**
**Style tiles**
**Muted text, underline indicating action**
**Accessibility**
**Iconography (or not having it at all)**

**TODO: Prob note that area alignment is more visual design than UI/UX**

**TODO: Similar to rails except someone else architected the backends and rails only supported one flavor that wasn't yours**

As a developer, knowing design basics has some benefits:

- Better communication with designers due to shared knowledge/vocabulary
- Better architecture for HTML/CSS
    - It's hard to build a system without knowing its core principles

# What is design?
Design is a broad categorization of many topics, similar to how the layperson's definition of "programming" is a sweeping statement (e.g. it can go from writing Assembly to writing CSS to managing networks).

Here are some common design categories:

- Visual/graphic design, to create visual assets such as logos, posters, and advertisements
    - Examples: [Behance][], [Dribbble][]
- User Interaction/User Experience (UI/UX) design, to plan out an application's pages and workflows
    - Examples: [Google][], [Uber][]
- Industrial design, to create, plan, and prototype physical objects
    - Examples: [Herman Miller][], [MUJI][]

[Behance]: https://www.behance.net/
[Dribbble]: http://dribbble.com/
[Google]: https://www.google.com/
[Uber]: https://www.uber.com/
[Herman Miller]: http://www.hermanmiller.com/
[MUJI]: http://www.muji.com/

We will be focusing on UI/UX design as this has the most crossover with developer work.

Before we get started, I want to give you the proper mindset. There is a common phrase in design:

> When there is good design, you will never notice it.

This means good design helps the user achieve their goals with as little friction as possible and in an intuitive manner. Good design doesn't need a tour guide -- the information and interactions are obvious.

# Grids
A grid (sometimes known as a typographic grid) is a way to layout elements horizontally for consistent widths and spacing. It's based on columns and gutters.

A column is space for content and a gutter is whitespace between columns. For elements that span multiple columns, then they will include their gutter in the width.

[![Screenshot from 960 grid demo](/public/images/articles/design-for-developers/960-grid.png)](/public/images/articles/design-for-developers/960-grid.png)

*Screenshot from http://960.gs/demo.html*

Examples:

- http://960.gs/demo.html
- http://foundation.zurb.com/grid.html
- http://twolfson.com/?grid

The most common breakdown is 960px width overall with 12 columns and 12 gutters. Gutters can be placed to the left, right, or evenly split around the column. In [Bootstrap][bootstrap-grid] and [Foundation][foundation-grid], they use left/right `padding` for an even split.

[bootstrap-grid]: http://getbootstrap.com/css/#grid
[foundation-grid]: http://foundation.zurb.com/grid-1.html

# Vertical rhythm and baselines
Vertical rhythm is how we guarantee consistent vertical placement and spacing.

It starts with the concept of a baseline, a repeating vertical spacing throughout the page (e.g. imagine a line every 16px). Then, we make sure paragraphs line up with that on every line break.

For larger elements (e.g. headings, images), then they will likely take up multiple lines (e.g. `n * 16px`) and possibly have multiple lines as padding on the bottom.

[![CSS baseline from Smashing Magazine article](/public/images/articles/design-for-developers/baseline.jpg)](http://www.smashingmagazine.com/2012/12/css-baseline-the-good-the-bad-and-the-ugly/)

*Image from http://www.smashingmagazine.com/2012/12/css-baseline-the-good-the-bad-and-the-ugly/*

Examples:

- http://twolfson.com/?grid

Further reading:

- http://www.smashingmagazine.com/2012/12/css-baseline-the-good-the-bad-and-the-ugly/

# Type hierarchy
Type hiearchy is the usage of different sizes of type (e.g. `h1`, `h2`, **bold**) to indicate the remaining content under it is related.

For example, "Getting Started" indicates the section is related to getting started with a repo:

[![Screenshot of twolfson.com README](/public/images/articles/design-for-developers/type-hierarchy.png)](/public/images/articles/design-for-developers/type-hierarchy.png)

Beyond this, there is type scales which are ways to define how big/small each of the `h1`, `h2`, etc should be. These are usually done by ratios (e.g. major third, golden ratio).

Links:

- http://type-scale.com/
- http://www.modularscale.com/

Type scale is one of those things that "looks right" (e.g. play around with it until comfortable). Although, baseline and type scale usually have a relationship.

# Typeface
Typefaces (or `font-face` in CSS) is the font being used for a given piece of text.

Serif fonts are fonts with those "little leaf things" on letters. For example:

[![Sample of Courier New](/public/images/articles/design-for-developers/typeface-serif.svg)](/public/images/articles/design-for-developers/typeface-serif.svg)

**Image of Courier New by Inductiveload via Wikipedia, https://en.wikipedia.org/wiki/Courier_%28typeface%29**

Sans-serif fonts are fonts without those "little leaf things" ("sans" means without). For example:

[![Sample of Arial](/public/images/articles/design-for-developers/typeface-sans-serif.svg)](/public/images/articles/design-for-developers/typeface-sans-serif.svg)

**Image of Arial by GearedBull via Wikipedia, https://en.wikipedia.org/wiki/Arial**

Serif typically is good for being formal and also helps with reading letters (e.g. can distinguish shape easier). On the other hand, sans-serif is less formal and a little harder to read.

Beyond this, there are lots of shapes for fonts. They can:

- Establish a mood
    - Example: http://www.fontsquirrel.com/fonts/lobster
- Identify a brand
    - Example: http://www.dafont.com/loki-cola.font

I should note that brands sometimes might take a font and then adjust it by hand to fully customize it to their identity.

I should also mention that there's a lot more of inner workings to fonts, so much that there are font designers. For example, there are different variables such as the height of each letter (x-height), spacing between letters, and angle that a letter's curves stop at (terminals).

# Visual components
Visual components (also known as design patterns, although not the development kind) are visual elements that are created and reused within an application. Some basic examples of this are:

**A dropdown**

[![Screenshot of a dropdown](/public/images/articles/design-for-developers/component-dropdown.png)](http://getbootstrap.com/components/#dropdowns)

**A modal**

[![Screenshot of a modal](/public/images/articles/design-for-developers/component-modal.png)](http://getbootstrap.com/javascript/#modals-related-target)

**Tabs**

[![Screenshot of tabs](/public/images/articles/design-for-developers/component-tabs.png)](http://getbootstrap.com/javascript/#tabs)

*Screenshots from http://getbootstrap.com/*

Beyond that, there are custom components that designers might create. For example, on Twitter we have these pairs of "heading" and "number". In their CSS, it seems to be named a `stat`:

[![Screenshot of Twitter profile stats](/public/images/articles/design-for-developers/component-stat.png)](https://twitter.com/)

*Screenshots from https://twitter.com/*

If you are interested in learning more about structuring HTML/CSS after this model, please see the [OOCSS section below](#oocss).

> Programmer rant: Also known as a jQuery plugin, React view, Angular view, web component, Backbone view, etc but never identified as a visual component =(

# Area alignment
As programmers, we like to automatically center things via the computer. However, this isn't always visually "correct".

Sometimes there is a optical center/visual center/content center which isn't the actual left/right center (average). For example:

[![Image of area alignment](/public/images/articles/design-for-developers/area-alignment.png)](https://medium.com/@erqiudao/the-play-button-is-not-optical-alignment-4cea11bda175)

*Image from https://medium.com/@erqiudao/the-play-button-is-not-optical-alignment-4cea11bda175*

In these scenarios, we need to either pad the image with transparent pixels or adjust positioning via CSS/HTML.

Further reading:

- "Area alignment" in [Universal Principles of Design][]
- https://medium.com/@erqiudao/the-play-button-is-not-optical-alignment-4cea11bda175

[Universal Principles of Design]: http://www.amazon.com/gp/product/1592535879

# Amendment
These rules are not hard and fast as in programming. Sometimes, the rules can be bent (e.g. using content weight centering instead of programmatically defined centering) and broken (e.g. give an element 20px of padding instead of 16px). The end goal is to get something that visually "looks right".

# Applying our knowledge
To take this knowledge further, we can apply it to our existing sites with the following tools/philosophies.

## OOCSS
A methodology to architect HTML/CSS around building visual components

- Introductory article: http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/
- Site: http://oocss.org/

This will be counter-intuitive to conceptions about "semantic" HTML but it will be fine as it scales across multiple pages and products (this is like [Bootstrap][]).

### Variations on OOCSS
Some more opinionated OOCSS philosophies can be found here:

- SMACSS, https://smacss.com/book/
- BEM, https://en.bem.info/method/key-concepts/
    - Alternative naming convention (my preference), http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/

## CSS framework vs UI toolkit
Tools like [Bootstrap][] and [Foundation][] are only practical if our design was initially based off of them. Otherwise, we will fight them at every turn. For example:

- Our baseline might be 1.5x our gutter width
- We might not want all baseline padding to be at the bottom
- We might want a dropdown in our navbar

[Bootstrap]: http://getbootstrap.com/
[Foundation]: http://foundation.zurb.com/

On top of that, calling them a "CSS framework" is a misnomer. They are meant to be used as a package not be built on top of. They should be referred to as "UI toolkits".

A "CSS framework" gives us all the variables and 80% of the work completed so we can fill in the remainder without any fights. For example:

- https://github.com/csswizardry/inuit.css
    - Example of everything it provides: https://terabytenz.github.io/inuit.css-kitchensink/

This comparison should feel like using [Django][]/[Rails][] vs [Flask][]/[Sinatra][]/[Express][].

[Django]: https://www.djangoproject.com/
[Rails]: http://rubyonrails.org/
[Express]: http://expressjs.com/
[Flask]: http://flask.pocoo.org/
[Sinatra]: http://www.sinatrarb.com/

## CSS utility libraries
Aside from CSS frameworks and UI toolkits, there are libraries that offer some helper CSS. For example:

- https://suitcss.github.io/

# Links
Here are some top picks of content that has helped me along:

- [A Practical Guide to Designing the Invisible][]
- [Don Norman on 3 ways good design makes you happy][don-norman] (TED talk)
- [Universal Principles of Design][]

[A Practical Guide to Designing the Invisible]: http://www.fivesimplesteps.com/products/a-practical-guide-to-designing-the-invisible
[don-norman]: http://www.ted.com/talks/don_norman_on_design_and_emotion?
