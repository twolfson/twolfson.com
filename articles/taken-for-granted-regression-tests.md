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
function scaleImage(img, scale) {
  return {
    width: img.height * scale,
    height: img.height * scale
  };
}
```

and we have a test suite for it

```js
describe('An image', function () {
  before(function setupImg () {
    this.img = {
      width: 25,
      height: 25
    };
  });

  describe('when scaled by 2', function () {
    before(function scaleImg () {
      this.result = scaleImage(this.img, 2);
    });

    it('scales to double the height and width', function () {
      expect(this.width).to.equal(50);
      expect(this.height).to.equal(50);
    });
  });
});

```

Then, we release this module as a `0.1.0` and people begin to use it. Unfortunately, we don't catch our

While this is a concept that seems intuitive upon explanation, it was an "a-ha" moment of discovery for myself a couple years into becoming a developer.
