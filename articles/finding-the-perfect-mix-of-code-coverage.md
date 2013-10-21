{
  "title": "Finding the perfect mix of code coverage",
  "author": "Todd Wolfson",
  "date": "2013/07/04",
  "keywords": "code coverage, perfect mix, perfect balance",
  "summary": "[Code coverage](https://en.wikipedia.org/wiki/Code_coverage) is the percentage of lines of code touched by a test suite. It is a good metric but API coverage is a new step forward."
}

[Code coverage][code-cov] is the percentage of lines of code that are touched by the test suite. In JS, some well known libs are [Istanbul][istanbul] and [JSCoverage][js-cov].

[code-cov]: https://en.wikipedia.org/wiki/Code_coverage
[istanbul]: https://github.com/gotwarlost/istanbul
[js-cov]: http://siliconforks.com/jscoverage/

## Why do I need the perfect mix?

A library can have no tests (0% coverage) or can have overlapping tests which cover every line (100% coverage) but neither is preferred.

In the 0% case, a simple change has the possibility of breaking functionality and there is no automated way to verify it does not.

For 100% libraries, any alteration requires updating at least 1 test case even if the feature is experimental or temporary.

To prevent manual testing and to reduce the pain of updating multiple tests for trivial changes, it is good to find the perfect mix for your library.

## What is the perfect mix?

The perfect mix has nothing to do with [code coverage][code-cov] at all. While it is a good metric to detect something breaking, API coverage is more practical.

API coverage is the percentage of public functions and the permutations of possible parameters which are tested.

Let's start with an existing library, [single-child][single-child] is a library I wrote during development of [listen-spawn][listen-spawn]. It `starts`/`kills` a child process to ensure only one exists at a time. Additionally, it fires `events` but they are not required as part of the core functionality.

[single-child]: https://github.com/twolfson/single-child
[listen-spawn]: https://github.com/twolfson/listen-spawn

From this, I would say that the `start`/`kill` methods are core functionality and the `events` are experimental.

With API coverage, core methods are weighted much higher as well as their required parameters (e.g. `70-100`). Optional methods as still important but not a significant weight (e.g. `35-50`). Experimental methods are given a low weight (e.g. `10-20`).

It is discouraged to test private methods unless it makes debugging easier. If you are testing a large amount of private methods, onsider that as an indicator to break out those methods into their own module with its own test suite (becoming public methods again).

If we look back at [single-child][single-child], the function signature looks like `new SingleChild(cmd, [args], [options]);`. Therefore, we **definitely** should test `new SingleChild(cmd);` and it would be a good idea to test `new SingleChild(cmd, args);` and `new SingleChild(cmd, options);`

If we look at the [test suite][child-tests], we will notice tests which are against `new SingleChild(cmd, args);` [mutliple times][cmd-args-tests] and no tests for `events`.

```js
'running a self-terminating command': function () {
  // Create a script that writes time to `tmp.txt`
  this.child = new SingleChild('node', ['-e', 'require("fs").writeFileSync("tmp.txt", +new Date())']);
},
// ... no events tests =(
```

[child-tests]: https://github.com/twolfson/single-child/tree/91d15a69c091a65273284e5310ffbc4a341500d4/test
[cmd-args-tests]: https://github.com/twolfson/single-child/blob/91d15a69c091a65273284e5310ffbc4a341500d4/test/single-child_test.content.js#L37-L41

### Testing bugs

Additionally, any bugs that pop up should be tested with a weight which directly corresponds to the frequency of it occurring and indirectly to the ability to reproduce.

For example, in [phantomjssmith][phantomjssmith], a subset of [node-canvas][node-canvas] on top of [phantomjs][phantomjs] for [sprite manipulation][spritesmith], we there was an issue with running into the Windows CLI character limit for too many images. It was a pain to test but was a common case and thus, made its way into the [test suite][phantomjssmith-test].

```js
'interpretting a ridiculous amount of images': function () {
  // Create and save an array of 500 images
  var images = [],
      coordinateArr = [],
      imagePath = path.join(imageDir, '16.jpg'),
      i = 0,
      len = 500;
  for (; i < len; i++) {
    images.push(imagePath);
    coordinateArr.push({
      x: 0,
      y: i * 16
    });
  }
  this.images = images;
  this.width = 16;
  this.height = 16 * 500;
  this.coordinateArr = coordinateArr;
},
```

[phantomjssmith]: https://github.com/twolfson/phantomjssmith
[node-canvas]: https://github.com/LearnBoost/node-canvas
[phantomjs]: https://github.com/twolfson/phantomjssmith
[spritesmith]: https://github.com/Ensighten/spritesmith
[phantomjssmith-issue]: https://github.com/Ensighten/spritesmith/issues/11
[phantomjssmith-test]: https://github.com/twolfson/spritesmith-engine-test/blob/932a6e9f34837cccb55f6fde070ae7998cda61fb/test_content.js#L41-L59

## Is there a library for this?
Currently, there is not. The goal of this article was to introduce this idea.

My visions for a library would use a [JSDoc block][jsdoc] to detect which methods are core, experimental, or exposed for extensibility. It would also indicate which parameters are required or optional.

There are loose ends like detecting extensions of other libraries (e.g. [EventEmitter][event-emitter]) but those should be tied up at early stages.

[jsdoc]: http://v3.javascriptmvc.com/docs/DocumentJS.html#
[event-emitter]: http://nodejs.org/api/events.html

## Pitfalls
### Overtesting parameters
It is possible to overtest with API coverage. If we have a function like `sum(numA, numB);`, the expected inputs would be two `Number`s. We can test unexpected inputs but these also should be given a low weight.

```
// Average use case
sum(2, 3);

// Far-fetched edge case
sum(null, null);
```

