{
  "title": "Retina sprites are here!",
  "author": "Todd Wolfson",
  "date": "2015-04-21T00:00:00-0500",
  "keywords": "retina, sprite, spritesheet, spritesmith",
  "summary": "[spritesmith](https://github.com/Ensighten/grunt-spritesmith) now supports retina sprites. This is an introduction to start using them."
}

![Normal spritesheet][]

![Retina spritesheet][]

[Normal spritesheet]: /public/images/articles/retina-sprites-are-here/spritesheet.png
[Retina spritesheet]: /public/images/articles/retina-sprites-are-here/spritesheet-2x.png

[spritesmith][grunt-spritesmith] now supports retina spritesheets in its [grunt][grunt-spritesmith] and [gulp][gulp.spritesmith] flavors:

https://github.com/Ensighten/grunt-spritesmith

https://github.com/twolfson/gulp.spritesmith

[grunt-spritesmith]: https://github.com/Ensighten/grunt-spritesmith
[gulp.spritesmith]: https://github.com/twolfson/gulp.spritesmith

In this article, we will walk through getting set up with both the [grunt](#grunt) and [gulp](#gulp) flavors.

# grunt
In a retina spritesheet project, we have 2 sets of images:

Normal images, showed to any user with a non-retina display:

![Fork sprite][] ![GitHub sprite][]  ![Twitter sprite][]

[Fork sprite]: /public/images/articles/retina-sprites-are-here/fork.png
[GitHub sprite]: /public/images/articles/retina-sprites-are-here/github.png
[Twitter sprite]: /public/images/articles/retina-sprites-are-here/twitter.png

Retina images, duplicate images that are twice as large (scaled 2x) for retina displays. When viewed, these are scaled down to the same size as the normal images but as a result provide a higher pixel density.

![Retina fork sprite][] ![Retina github sprite][]  ![Retina twitter sprite][]

[Retina fork sprite]: /public/images/articles/retina-sprites-are-here/fork-2x.png
[Retina github sprite]: /public/images/articles/retina-sprites-are-here/github-2x.png
[Retina twitter sprite]: /public/images/articles/retina-sprites-are-here/twitter-2x.png

For you to follow along, we have created a [gist][grunt-gist] with the images and configuration we are working with:

https://gist.github.com/twolfson/f9d046b1e312809fced0

[grunt-gist]: https://gist.github.com/twolfson/f9d046b1e312809fced0

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
// Load in our compiled SCSS variables
@import 'sprites.scss';

// Generate sprite rules and media queries
@include retina-sprites($retina-groups);
```

## `sprite` conifg
The `src` parameter is the images we will be combining into a spritesheet. When we are generating a retina spritesheet, we include all normal and retina images via `src`. We will separate the retina ones via a filter later on.

> We provide all images via `src` to guarantee support for plugins like [grunt-newer][] which require observing all origin images.

```js
src: ['*.png'],
```

[grunt-newer]: https://github.com/tschaub/grunt-newer

The `retinaSrcFilter` is how we tell apart normal images from retina images. This filter is intended to match filepaths of retina images only.

```js
retinaSrcFilter: ['*-2x.png'],
```

The `dest` and `retinaDest` parameters indicate where our normal and retina spritesheets should be saved to respectfully.

```js
dest: 'dist/spritesheet.png',
retinaDest: 'dist/spritesheet-2x.png',
```

The `destCss` paramter indiciates where to save our spritesheet variables/mixins. When being used for a retina task, this will include normal sprites, retina sprites, and their groupings.

```js
destCss: 'sprites.scss'
```

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

**Spritesheets:**

![Normal spritesheet][]

![Retina spritesheet][]

**CSS:**

```css
.fork {
  background-image: url(dist/spritesheet.png);
  background-position: 0px 0px;
  width: 32px;
  height: 32px; }
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .fork {
      background-image: url(dist/spritesheet-2x.png);
      background-size: 64px 64px; } }

.github {
/* ... */
```

More documentation and details can be found in the [grunt-spritesmith][] documentation.

https://github.com/Ensighten/grunt-spritesmith

# gulp

## Attribution
[GitHub][github-icon] and [Twitter][twitter-icon] icons were taken from [Alex Peattie's JustVector Social Icons][justvector].

[Fork][noun-fork-icon] designed by [P.J. Onori][onori] from The Noun Project

[justvector]: http://alexpeattie.com/projects/justvector_icons/
[noun-fork-icon]: http://thenounproject.com/noun/fork/#icon-No2813
[onori]: http://thenounproject.com/somerandomdude
