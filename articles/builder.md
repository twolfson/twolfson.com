{
  "title": "Builder - Build chain for your client side",
  "author": "Todd Wolfson",
  "date": "2013/03/11",
  "_summary": "Another overdue introduction -- This time to [Builder](https://github.com/Ensighten/Builder), a framework for automating common client-side steps."
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

Usage
-----
From my perspective, client-side markup (HTML or otherwise), should encapsulate any and all interactive components. As a result, [Builder][Builder] was designed to handle anything you throw at it; from template rendering to plugin instantiation.

There are 4 steps which Builder runs through:

1. `Builder.before(fn);` - Any alterations/instrumentation to perform on the input for Builder
2. `Builder.template(tmpl, data);` - Parse template string through its engine. This would render Jade into HTML.
3. `Builder.domify(content);` - Converts HTML into [HTMLElements][html-elements], [jQuery elements][jquery-elements], or whatever you choose.
4. `Builder.after(fn);` - Any alterations/instrumentation to perform on the output of Builder

[html-elements]: https://developer.mozilla.org/en-US/docs/DOM/HTMLElement
[jquery-elements]: http://api.jquery.com/jQuery/#jQuery2

Builder can be [tweaked to your liking][tweaks] and has [presets][presets] which can be found in the Builder documentation.

[tweaks]: https://github.com/Ensighten/Builder#documentation
[presets]: https://github.com/Ensighten/Builder#presets

Origin
------
[Builder][Builder] came out of a want to <abbr title="don't repeat yourself">DRY</abbr> up client side code. I saw the pattern and repetition present that the same template engine and jQuery plugins would be called over and over in different places.

I attempted to resolve the issue at first via [Mason.js][mason.js]. This would act as a post-template processor, converting strings to DOM elements via [its own custom markup][mason-examples].

[mason-examples]: http://twolfson.github.com/Mason.js/

It was extremely extensible and open however it was too many steps removed from the problem. Any and every jQuery plugin would need a custom wrapper and I sincerely disliked that.

After stepping back and thinking about it long enough, I came up with [Builder][Builder] which slowly grew into what you see today.
