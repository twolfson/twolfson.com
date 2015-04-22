{
  "title": "Retina sprites are here!",
  "author": "Todd Wolfson",
  "date": "2015-04-21T00:00:00-0500",
  "keywords": "retina, sprite, spritesheet, spritesmith",
  "summary": "[spritesmith](https://github.com/Ensighten/grunt-spritesmith) now supports retina sprites. This is an introduction to start using them."
}

//- TODO: Add spritesheet and retina spritesheet images

![1x spritesheet](#)

![2x spritesheet](#)

[spritesmith][grunt-spritesmith] now supports retina spritesheets in its [grunt][grunt-spritesmith] and [gulp][gulp.spritesmith] flavors:

//- TODO: Add URL to grunt-spritesmith

//- TODO: Add URL to gulp.spritesmith

In this article, we will walk through getting set up with both the [grunt](#) and [gulp](#) flavors.

//- TODO: Link to proper headings

# grunt
In a retina spritesheet project, we have 2 sets of images:

Normal images, showed to any user with a non-retina display:

//- TODO: Link me

![Normal images](#)

Retina images, duplicate images that are twice as large (scaled 2x) for retina displays. When viewed, these are scaled down to the same size as the normal images but as a result provide a higher pixel density.

//- TODO: Link me

![Retina images](#)

For you to follow along, we have created a [gist] with the images and configuration we are working with:

//- TODO: Add URL to grunt-spritesmith gist

We will set up a `Gruntfile.js` with the following config:

```js
module.exports = function (grunt) {
  // Configure our grunt tasks
  grunt.initConfig({
    sass: {
      main: {
        // Compile our SCSS which relies on the SCSS from spritesmith
        src: 'index.scss',
        dest: 'dist/index.scss'
      }
    },
    sprite: {
      main: {
        // Include all normal and `-2x` (retina) images
        //   e.g. `github.png`, `github-2x.png`
        src: ['*.png'],

        // Filter out `-2x` (retina) images to separate spritesheet
        //   e.g. `github-2x.png`, `twitter-2x.png`
        retinaSrcFilter: ['*-2x.png'],

        // Generate a normal and a `-2x` (retina) spritesheet
        dest: 'dist/spritesheet.png',
        retinaDest: 'dist/spritesheet-2x.png',

        // Generate SCSS variables/mixins for both spritesheets
        destCss: 'sprites.scss'
      }
    }
  });

  // Load in our task dependencies
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-spritesmith');
};
```

Additionally, we will set up a SCSS file that relies on the compiled SCSS from `spritesmith`:

```scss
# Load in our compiled SCSS variables
@import 'sprites.scss';

# Generate sprite rules and media queries
@include retina-sprites($retina-groups);
```

## `sprite` conifg
The `src` parameter is the images we will be combining into a spritesheet. When we are generating a retina spritesheet, we include all normal and retina images via `src`. We will separate the retina ones via a filter later on.

> We provide all images via `src` to guarantee support for plugins like [grunt-newer][] which require observing all origin images.

```js
src: ['*.png']
```

// TODO: Link to `grunt-newer`

The `retinaSrcFilter` is how we tell apart normal images from retina images. This filter is intended to match filepaths of retina images only.

```js
retinaSrcFilter: ['*-2x.png']
```

The `dest` and `retinaDest` parameters indicate where our normal and retina spritesheets should be saved to respectfully.

```js
dest: 'dist/spritesheet.png',
retinaDest: 'dist/spritesheet-2x.png',
```

The `

## Compiled result
To yield our result, we will compiled the spritesheet once and then generate CSS from that.

We prefer to keep these separate since recompiling sprites on every CSS generation is costly in terms of time.

```bash
# Generate our spritesheets
grunt sprite

# Compile our CSS
grunt sass
```

The final results are:

TODO: Link to spritesheets

```css
.github {
  // TODO: Show me
}

@media {
  .github {
    // TODO: Show me
  }
}
```

// TODO: More documentation and details can be found in the [grunt-spritesmith][] documentation

# gulp
