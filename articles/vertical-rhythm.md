{
  "title": "Bringing vertical rhythm to code",
  "author": "Todd Wolfson",
  "_date": "2013/05/27",
  "date": "Mon May 27 2013 01:00:00",
  "_summary": "An experiment and attempt at understanding my code patterns."
}

On various occasions at my new company, I have been asked to use less comments. This is a funny problem to have; it wasn't that I was abusing comments, it was that the code was in Python and self-descriptive enough.

At that point, I realized that while my code was consistent and well-commented, there wasn't a rhyme or reason to my structure. When I initially started developing in PHP, I began to chunk my code because it "just felt right".

Some of my first PHP (August 2008), no comments, solid block of code.

>    I am very much repulsed by this code.

```php
$file_choice = $_POST['file_choice'];
$file_action = trim($_POST['file_action']);
$file_name_field = trim(htmlspecialchars($_POST['file_name_field']));
$link_loc = $_POST['link_loc'];
$ext_link_loc = trim(htmlspecialchars($_POST['ext_link_loc']));
$link_order = $_POST['link_order'];
```

A couple of years later (September 2010), comments are finally in, and chunking code.

>    While the intent of the code is quite nasty, the code itself feels very clean.

```php
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

Suprisingly, my comment style has not progressed much since this state. Instead, I spent the time developing an architectural intuition.

> The following snippet was grabbed from [spritesmith][spritesmith] (November 2012)

[spritesmith]: https://github.com/Ensighten/spritesmith/blob/1659f6d43a9c35626b783143a10df797ec115984/src/smith.js#L41-L57

```js
// Create our smiths
var engineSmith = new EngineSmith(engine),
    layer = new Layout(algorithmPref),
    exportOpts = params.exportOpts || {},
    packedObj;

// In a waterfall fashion
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
```

