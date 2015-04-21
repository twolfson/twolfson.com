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

For you to follow along, we have created a [gist] with the images we are working with:

//- TODO: Add URL to grunt-spritesmith gist

For [grunt-spritesmith][] we need to provide all images via the `src`. This guarantees we will support plugins like [grunt-newer][] which require observing all origin images.

//- TODO: List out folder structure

//- TODO: List out images and names

```js
src: ['*.png'] // Includes normal and `-2x` images
```

With retina support we need to indicate to [grunt-spritesmith][] which of these images is a retina image or not. To do this, we use the same [glob][] pattern we did for `src` but focused at `retina` sprites:

//- TODO: We should provide finished product up front and explain details here

```js
retinaSrcFilter: ['*-2x.png']  // Only includes `-2x` images
```

//- TODO: Do we really want to go into this much detail? Yes, we should be helpful. But we need to be wary of using gists since they don't support nesting/good structure.

# gulp

# What took so long?
