{
  "title": "Spritesheets and variables made easy",
  "author": "Todd Wolfson",
  "date": "2013-03-11T00:00:00-0700",
  "keywords": "spritesheets, spritesmith, variables, scss, sass, stylus, less, css, json",
  "summary": "A long overdue introduction to [Spritesmith](https://github.com/Ensighten/grunt-spritesmith) and its [components](https://github.com/Ensighten/grunt-spritesmith#contributing).",
  "relatedProjects": ["spritesmith"]
}

[grunt-spritesmith][grunt-spritesmith] is a grunt plugin takes in paths to sprites and outputs a spritesheet and CSS pre-processor variables.

```js
grunt.initConfig({
  'sprite': {
    'all': {
      // Sprite files to read in
      'src': ['public/images/sprites/*.png'],

      // Location to output spritesheet
      'destImg': 'public/images/sprite.png',

      // Stylus with variables under sprite names
      'destCSS': 'public/css/sprite_positions.styl'
    }
  }
});
```

[grunt-spritesmith]: https://github.com/Ensighten/grunt-spritesmith

Organization
============
[grunt-spritesmith][grunt-spritesmith] is composed of 5 separate modules. Each of them was built to be extensible at run-time.

- [grunt-spritesmith][grunt-spritesmith] -- What you were shown above
- [spritesmith][spritesmith] -- Reads in sprites and composes spritesheet
- [layout][layout] -- Handles positioning of images and multiple algorithmic options
- [json2css][json2css] -- Converts JSON to CSS pre-processor strings
- [json-content-demux][content-demux] -- Breaks up JSON defaults from content for easy templating

[spritesmith]: https://github.com/Ensighten/spritesmith
[layout]: https://github.com/twolfson/layout
[json2css]: https://github.com/twolfson/json2css
[content-demux]: http://github.com/twolfson/json-content-demux

## grunt-spritesmith
This acts as a glue layer for integration of [spritesmith][spritesmith] and [json2css][json2css] into [grunt][grunt].

It expands the paths provided via [minimatch][minimatch], passes those on to [spritesmith][spritesmith], processes the coordinates via [json2css][json2css], and writes out the spritesheet and CSS variable declarations.

[grunt]: https://github.com/gruntjs/grunt/
[minimatch]: https://github.com/isaacs/minimatch

## spritesmith
Spritesmith is where the magic happens. It was built with [cross-platform functionality][engines] in mind and took a lot of <abbr title="tender loving care">TLC</abbr> to get working just right.

It reads in the images via its engine, lays them out via [layout][layout], adds the sprites to a canvas, output the canvas, and callback with everything.

Aside: I was a few steps away from a cross-platform [node-canvas][node-canvas]. Hopefully, someone will implement that soon.

Another aside: I wanted to add URL based engine (canvas via an API) but could not find one. It's still on my TODO list to make one.

[engines]: https://github.com/Ensighten/spritesmith#requirements
[node-canvas]: https://github.com/LearnBoost/node-canvas

## layout
This was built for re-use and modular purification. It was made agnostic so that anything with a height and width dimension could be laid out in a specific algorithm.

## json2css
This was built for simplified unit testing and re-use. It was built so that new templates could be easily added and tested.

## json-content-demux
This was built as an answer to a slick solution for encapsulating the relationship between template data and its template.

It initially came from [toto][toto] and it has come up time and time again as a slick solution to this encapsulation. I have used it in [jojo][jojo] and want to use it as an [elegant solution][view-contained] for keeping template interactivity self-contained.

[toto]: https://github.com/cloudhead/toto
[jojo]: https://github.com/twolfson/jojo
[view-contained]: https://gist.github.com/twolfson/4464886

Ending
======
This project was very fun to build and had a lot of thought put into it.

I hope you enjoy using it!
