{
  "title": "BDD and the Future",
  "author": "Todd Wolfson",
  "date": "2013/05/27",
  "_summary": "A presentation overviewing the history of BDD and some of my experiments."
}

I recently spoke at [UtahJS][utahjs] and presented on the history of BDD and some of my experiments.

The presentation can be [found here][presentation] with the source code on [GitHub][source]. It covers the invention of TDD, evolution into BDD, the various BDD flavors, and all JS testing options currently available.

[utahjs]:
[presentation]:
[source]:

For a while, I have been experimenting with BDD. At first, I wanted a cross-framework test runner from [vows][vows] to [mocha][mocha]. This was initially called [Skeleton][skeleton], later renamed to [Crossbones][crossbones] and was successfully implemented in the [Sauron][sauron] test suite.

[vows]:
[mocha]:
[skeleton]:
[crossbones]:
[sauron]:

This was great but I wanted something better. This required writing the tests in their own framework

```js
// TODO: Skeleton test samples
```