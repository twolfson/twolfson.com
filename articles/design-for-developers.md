{
  "title": "Design for developers",
  "author": "Todd Wolfson",
  "date": "2015-12-26T16:40:30-0600",
  "keywords": "design, developers, engineers",
  "summary": "An introduction to design, targeted at developers."
}

**TODO: Consider images for "What is design?" section**
**TODO: Consider image for "Grid" section**
**TODO: Consider adding more Further reading items**

As a developer, knowing design basics has some benefits:

- Better communication with designers due to having shared knowledge
- Better architecture for HTML/CSS
    - It's hard to build a system without knowing its root principles
- Can provide targeted feedback about designs and propose other ideas

# What is design?
Design is a broad categorization of many topics, similar to how the layperson's concept of "programming" encompasses writing Assembly to writing CSS to managing networks.

Here are some instances of design:

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

This means good design helps the user achieve their goals with as little friction as possible and in an intuitive manner. Good design doesn't need tour guides -- the interactions are obvious.

# Grids
A grid (sometimes known as a typographic grid) is a way to layout elements horizontally for consistent widths and spacing. It's based on columns and gutters.

A column is space for content and a gutter is whitespace between columns. For elements that span multiple columns, then they will include their gutter in the width.

**TODO: Add image here**

Examples:

- http://foundation.zurb.com/grid.html
- http://960.gs/demo.html
- http://twolfson.com/?grid

Typically grids have 12 columns but they can be 16 or 24. The goal is to a nice amount of subdivisions.

# Vertical rhythm and baselines
Vertical rhythm is how we guarantee consistent vertical placement and spacing.

It starts with the concept of a baseline, a repeating vertical spacing throughout the page (e.g. imagine a line every 16px). Then, we make sure paragraphs line up with that on every line break. For larger elements (e.g. headings, images), then they will likely take up multiple lines (e.g. `n * 16px`) and possibly have multiple lines as padding on the bottom.

**TODO: Add image here**

Examples:

- http://twolfson.com/?grid

Further reading:

- http://www.smashingmagazine.com/2012/12/css-baseline-the-good-the-bad-and-the-ugly/

# Type hierarchy
Type hiearchy is the usage of different sizes of type (e.g. `h1`, `h2`, **bold**) to indicate the remaining content under it is related.

For example, "Getting Started" indicates the section is related to getting started with a repo:

**TODO: Add screenshot of Getting Started from a repo**

Beyond this, there is type scales which are ways to define how big/small each of the `h1`, `h2`, etc should be. These are usually done by ratios (e.g. major third, golden ratio).

Links:

- http://type-scale.com/
- http://www.modularscale.com/

Type scale is one of those things that "looks right" (e.g. play around with it until comfortable). Although, baseline and type scale usually have a relationship.

# Typeface
Typefaces (or `font-face` in CSS) is the font being used for a given piece of text.

Serif fonts are fonts with those "little leaf things" on letters. For example:

**TODO: Screenshot instead of link**

- https://en.wikipedia.org/wiki/Times_New_Roman

Sans-serif fonts are fonts without those "little leaf things" ("sans" means without). For example:

**TODO: Screenshot instead of link**

- https://en.wikipedia.org/wiki/Helvetica

Serif typically is good for being formal and also helps with reading letters (e.g. can distinguish shape easier). On the other hand, sans-serif is less formal and a little harder to read.

Beyond this, there are lots of shapes for fonts. They can:

- Establish a mood
    - **TODO: Screenshot instead of link**
    - Example: http://www.fontsquirrel.com/fonts/lobster
- Identify a brand
    - **TODO: Screenshot instead of link**
    - Example: http://www.dafont.com/loki-cola.font

I should note that brands sometimes might take a font and then adjust it by hand to fully customize it to their identity.

# Visual compoennts
Also known as design patterns (although not the development kind)

- Visual components (e.g. jQuery plugin, React view, Angular view, web component, Backbone view)

# Content weight
- What we percieve as visual center might not be right

Some article with a dancer/ballerina in it =_=

And a play button one Medium too

# Amendment
These rules are not hard and fast as in programming. Sometimes, the rules can be bent (e.g. using content weight centering instead of programmatically defined centering) and broken (e.g. give an element 20px of padding instead of 16px). The end goal is to get something that visually "looks right".

# For developers
- CSS framework vs UI toolkit
    - Elaborate on Bootstrap/Foundation vs Inuit.css
    - Talk about others like Suit
    - Talk about Bourbon, Bitters, and Compass
- OOCSS

# Links
- Designing the invisible by 5 Simple Steps
- Donald Norman's TED talk
- Good UI
- 101 Design Principles
