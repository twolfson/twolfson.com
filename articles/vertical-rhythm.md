{
  "title": "Bringing vertical rhythm to code",
  "author": "Todd Wolfson",
  "date": "Mon May 27 2013 01:00:00",
  "keywords": "vertical rhythm, code, design code, typography",
  "summary": "An experiment and attempt at understanding my code patterns.",
  "relatedArticles": ["Optimal line length theory", "Readability: Formalized"]
}

On various occasions at my new company, I have been asked to use less comments. This is a funny problem to have; it wasn't that I was abusing comments, it was that the code was in Python and self-descriptive enough.

At that point, I realized that while my code was consistent and well-commented, there wasn't a rhyme or reason to my structure. One day my PHP started off like this:

```php
$file_choice = $_POST['file_choice'];
$file_action = trim($_POST['file_action']);
$file_name_field = trim(htmlspecialchars($_POST['file_name_field']));
$link_loc = $_POST['link_loc'];
$ext_link_loc = trim(htmlspecialchars($_POST['ext_link_loc']));
$link_order = $_POST['link_order'];
```

and magically transformed into this.

> At the time, I was a solo freelancer and not reading any blogs so it definitely was magic.

```js
//Run through all items and add some formatting
foreach( $listing as $key => $item )
{
  //Hyperlink URLs
  $item = preg_replace(
      '/(.*\s|^)(http:\/\/.*?)(\s|$)/',
      '$1<a href="$2">$2</a>$3',
      $item
    );

  //Hyperlink Emails
  $item = preg_replace(
        '/(.*\s|^)(.*?@.*?)(\s|$)/',
        '$1<a href="mailto:$2">$2</a>$3',
        $item
      );

  //Convert \n to br's
  $item = nl2br( $item );

  //Save changes
  $listing[$key] = $item;
}
```

I never questioned this transition or why I don't write more/less comments. It always has "just felt right".

# Attempting to understand the intuitive
For a while I have been making an attempt to learn about design and user experience. One concept that has jumped out at me is [vertical rhythm][vert-rhythm].

> In fact, it caused me to refactor my CSS to use [Twitter Bootstrap][bootstrap] so I could get [vertical rhythm][vert-rhythm-commit] on [twolfson.com][twolfson.com].

[vert-rhythm]: http://24ways.org/2006/compose-to-a-vertical-rhythm/
[bootstrap]: http://twitter.github.io/bootstrap/
[vert-rhythm-commit]: https://github.com/twolfson/twolfson.com/commit/09b11bd66c51bc1348b4e542ddd5cc708636cb02
[twolfson.com]: http://twolfson.com/

In short, [vertical rhythm][vert-rhythm] is a way of structuring headings and paragraphs with vertical spacing such that they flow in an easy and predictable manner. A good analogy would be to the repetitive nature of music.

[![Image demonstrating vertical rhythm](/public/images/articles/vertical-rhythm1.jpg)](http://coding.smashingmagazine.com/2012/12/17/css-baseline-the-good-the-bad-and-the-ugly/)

With this notion in mind, it would make sense for code blocks to be similarly formatted with comments in a consistent location. Therefore, increasing readability even though it is more text.

## Without vertical rhythm
```js
// In series
async.waterfall([
  function grabImages (cb) {
    // Map the files into their image counterparts
    engineSmith.createImages(files, cb);
  },
  // Then, add the images to our canvas (dry run)
  function smithAddFiles (images, cb) {
    images.forEach(function (img) {
      layer.addItem({'width': img.width, 'height': img.height, 'meta': img});
    });

    // Callback with nothing
    cb(null);
  },
  // Then, output the coordinates
  function smithOutputCoordinates (cb) {
    packedObj = layer['export']();
    var coordinates = {},
        packedItems = packedObj.items;
```

## With vertical rhythm
```js
// In series
async.waterfall([
  function grabImages (cb) {
    // Map the files into their image counterparts
    engineSmith.createImages(files, cb);
  },
  function addFiles (images, cb) {
    // Add the images to our canvas (dry run)
    images.forEach(function (img) {
      layer.addItem({'width': img.width, 'height': img.height, 'meta': img});
    });

    // Callback with nothing
    cb(null);
  },
  function outputCoordinates (cb) {
    // Export and saved packedObj for later
    packedObj = layer['export']();

    // Extract the coordinates
    var coordinates = {},
        packedItems = packedObj.items;
```