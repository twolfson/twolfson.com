{
  "title": "Taken for granted: Regression tests",
  "author": "Todd Wolfson",
  "date": "2014-05-28T23:42:55-07:00",
  "keywords": "taken for granted, regression tests, protip",
  "summary": "There are some &quot;a-ha&quot; moments on the road to becoming a better developer. This article visits one of mine, regression tests."
}

Regression tests are tests that prevent unexpected behavior that occurred in a non-ideal environment (e.g. `production`) from occurring again.

Let's pretend we are working on an image scaling library which has a flaw in it:

```js
function scaleDimensions(params) {
  var scale = params.scale; // Example scale: 2
  return {
    height: params.height * scale,
    width: params.height * scale
  };
}
```

While this is a concept that seems intuitive upon explanation, it was an "a-ha" moment of discovery for myself a couple years into becoming a developer.
