{
  "title": "Bringing vertical rhythm to code",
  "author": "Todd Wolfson",
  "_date": "2013/05/27",
  "date": "Mon May 27 2013 01:00:00",
  "_summary": "An experiment and attempt at understanding my code patterns."
}

On various occasions at my new company, I have been asked to use less comments. This is a funny problem to have; it wasn't that I was abusing comments, it was that the code was in Python and self-descriptive enough.

At that point, I realized that while my code was consistent and well-commented, there wasn't a rhyme or reason to my structure. I have had the same progression to most programmers from solid code block to chunked and commented code blocks.

> That sad starting place.

```php
$file_choice = $_POST['file_choice'];
$file_action = trim($_POST['file_action']);
$file_name_field = trim(htmlspecialchars($_POST['file_name_field']));
$link_loc = $_POST['link_loc'];
$ext_link_loc = trim(htmlspecialchars($_POST['ext_link_loc']));
$link_order = $_POST['link_order'];
```

> The well architected and well commented holy land.

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

However,