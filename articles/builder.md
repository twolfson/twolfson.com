{
  "title": "Builder - Build chain for your client side",
  "author": "Todd Wolfson",
  "date": "2013/03/11",
  "_summary": "Another overdue introduction -- This time to [Builder](https://github.com/Ensighten/Builder)."
}

[Builder][Builder] is a framework for automating common steps performed when rendering content on your client side.

[Builder]: https://github.com/Ensighten/Builder

```html
<script src="jquery.js"></script>
<script src="dist/Builder.min.js"></script>
<script>
// Demonstration of jQuery Builder

// Specify Jade as our template engine
Builder.set('template engine', jade.render);

// Register a few plugins
Builder.addPlugin('datepicker');
Builder.addPlugin('timepicker');

// Render our view via jQuery
var template = [
      '#main',
      '  input.datepicker',
      '  input.timepicker'
    ].join('\n'),
    $content = Builder(template);

// Content is a jQuery collection of #main
$content; // [<div id="main">]

// The children have also been rendered
$content.find('.datepicker'); // [<input class="datepicker">]

// and datepicker has already bound to the DOM and is visually represented

// the same goes for timepicker
</script>
```

[Builder][Builder] took a [couple of iterations to get right][mason.js]. I have talked about [this project before][screencast]. However, with the [open sourcing of Halo][Halo], I decided to step back and break it down just right.

[mason.js]: https://github.com/twolfson/Mason.js
[screencast]: /2012-07-04-why-your-client-side-framework-deserves-a-build-chain
[Halo]: https://github.com/Ensighten/Halo