{
  "title": "Spritesheets and variables made easy",
  "author": "Todd Wolfson",
  "date": "2013/03/11",
  "_summary": "A long overdue introduction to [Spritesmith](https://github.com/Ensighten/grunt-spritesmith) and its [components](https://github.com/Ensighten/grunt-spritesmith#contributing)."
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
------------
It is composed of 5 separate modules:

- [grunt-spritesmith][grunt-spritesmith] -- What you were shown above
- [spritesmith][spritesmith] -- Reads in sprites and composes spritesheet
- [layout][layout] -- Handles positioning of images and multiple algorithmic options
- [json2css][json2css] --
- [json-content-demux][content-demux] -- Breaks up JSON defaults from content for easy templating

[spritesmith]: https://github.com/Ensighten/spritesmith
[layout]:
[json2css]:
[content-demux]:

### grunt-spritesmith
This acts as a glue layer for integration of [spritesmith][spritesmith] and [json2css][json2css] into [grunt][grunt].

[grunt]:

[engines]: https://github.com/Ensighten/spritesmith#requirements