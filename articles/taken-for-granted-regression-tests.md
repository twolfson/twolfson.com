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
describe('An image when scaled by 2x', function () {
  before(function scaleImg () {
    this.result = scaleImage({
      width: 25,
      height: 25
    }, 2);
  });

  it('scales to doubles the height and width', function () {
    expect(this.result.width).to.equal(50);
    expect(this.result.height).to.equal(50);
  });
});
```

Unfortunately, our test suite is naive and misses the issue. We release our library and after a week, we get a bug report that some images are being cropped. This type of bug is known as a *regression*, as in "an expected behavior has been undone".

We could fix the issue and release it, but we should want to prevent the issue from happening again. This is known as a *regression test*.

First, we will write our test first which should fail, verifying we have reproduced the bug.

```js
describe('An image with uneven dimensions when scaled by 2x', function () {
  before(function scaleImg () {
    this.result = scaleImage({
      width: 25,
      height: 30
    }, 2);
  });

  it('scales to doubles the height and width', function () {
    expect(this.result.width).to.equal(50);
    expect(this.result.height).to.equal(60);
  });
});
```

Next, we will patch the issue:

```js
function scaleImage(img, scale) {
  return {
    width: img.width * scale,
    height: img.height * scale
  };
}
```

Now, our tests are passing and we have prevented the issue from occuring again.

While this is a concept that seems intuitive upon explanation, it was an "a-ha" moment of discovery for myself a couple years into becoming a developer.
