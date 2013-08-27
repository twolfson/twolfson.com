{
  "title": "BDD and the Future",
  "author": "Todd Wolfson",
  "date": "2013/05/27",
  "summary": "A presentation overviewing the history of BDD and some of my experiments."
}

I recently spoke at [UtahJS][utahjs] and presented on the history of BDD and some of my experiments.

The presentation can be [found here][presentation] with the source code on [GitHub][source]. It covers the invention of TDD, evolution into BDD, the various BDD flavors, and all JS testing options currently available.

[utahjs]: https://twitter.com/utjs
[presentation]: http://twolfson.github.io/behavioral-driven-development-and-the-future-presentation/utahjs/index.html
[source]: https://github.com/twolfson/behavioral-driven-development-and-the-future-presentation/

## Experiments
### Skeleton / Crossbones
GitHub: [https://github.com/Ensighten/crossbones][crossbones]

For a while, I have been experimenting with BDD. At first, I wanted a cross-framework test runner from [vows][vows] to [mocha][mocha]. This was initially called [Skeleton][skeleton], later renamed to [Crossbones][crossbones] and was successfully implemented in the [Sauron][sauron] test suite.

[vows]: http://vowsjs.org/
[mocha]: http://visionmedia.github.io/mocha/
[skeleton]: https://github.com/Ensighten/Sauron/blob/9fde7eceba9c21dbb123676fe607ac93561b2e51/src-test/Skeleton.js
[crossbones]: https://github.com/Ensighten/crossbones
[sauron]: https://github.com/Ensighten/Sauron/blob/9fde7eceba9c21dbb123676fe607ac93561b2e51/src-test/Sauron.test.js

This was great but I wanted something better. [Crossbones][crossbones] required writing the tests in their own framework which was similar to [vows][vows] but not vanilla [vows][vows] (exporting was weird).

```js
// Create a new test suite
var suite = new Skeleton('Sauron.js');

// Add in a test batch -- this is for a global mediator
suite.addBatch({
  'Sauron': {
    'can emit events': function () {
      Sauron.voice('hello');
    },
    'can set up functions to subscribe to events': function () {
      var works = false;
      Sauron.on('basicOn', function () {
        works = true;
      });
      Sauron.voice('basicOn');
      assert(works);
    },
    'can unsubscribe functions from events': function () {
      var count = 0;
      function basicOff() {
        count += 1;
      }

      Sauron.on('basicOff', basicOff);
      Sauron.voice('basicOff');
      Sauron.off('basicOff', basicOff);
      Sauron.voice('basicOff');
      assert(count === 1);
    }
  }
});

// Export the suite to mocha
suite.exportTo('Mocha');

// and run it
var runner = mocha.run();
```

### Sculptor
GitHub: [https://github.com/twolfson/sculptor][sculptor]

A long while after [Crossbones][crossbones] and its ultimate neglect, I thought about writing a framework for cross-compiling test suites. The key reason here was to flatten test suites into TDD-compatible flavors for [testling][testling].

I began hacking on this and [got quite far][sculptor] (it works with wrapping [vows][vows] into [mocha][mocha] tests) but soon realized that compiling a test suite into another framework's test suite was a total mindfuck.

[sculptor]: https://github.com/twolfson/sculptor

### doubleshot
GitHub: [https://github.com/twolfson/doubleshot][doubleshot]

After considering [Sculptor][sculptor] as an over-engineered project in attempt to find a holy grail.

>    I have begun to realize all of my "holy grails" are usually over-engineered items that I throw away a month later.

I decided to start on something much simpler and finer focus. I realized that saying `describe` versus typing out `topic` was a silly semantics issue. On [previous projects][mason-outline], I wrote out a specification for my test before writing the tests themselves.

[doubleshot]: https://github.com/twolfson/doubleshot
[mason-outline]: https://github.com/twolfson/Mason.js/blob/0622fe3879eab880c81e6f6095db828b813ff146/src-test/Mason.test.js

I realized this was awesome and always had the side thought that the specification would become lost once I fill out the tests due to code bloat. I wanted a cleaner way in the same loose language to keep them around.

Upon this next iteration, I tried out splitting the outline from the content and fell in love with the latest format. [doubleshot][doubleshot] was born.

```js
// outline.json
{
  "One": {
    "is equal to one": true
  }
};

// test/content.js
{
  'One': function () {
    this.one = 1;
  },
  'is equal to one': function () {
    assert.strictEqual(this.one, 1);
  }
}

// Runs test as
describe('One', function () {
  before(function () {
    this.one = 1;
  });

  it('is equal to one', function () {
    assert.strictEqual(this.one, 1);
  });
});
```

Shortly after writing, I discovered cool functionality I could build in (e.g. `aliasing` and `chaining` of methods).

```js
// outline.json
{
  "One plus two": {
    "is equal to three": true
  }
}

// content.js
{
  // Breaks 'One plus two' action into 2 actions
  'One plus two': ['One', 'plus two'],
  'One': function () {
    this.sum = 1;
  },
  'plus two': function () {
    this.sum += 2;
  },
  // Alias 'is equal to three' as 'equals three'
  'is equal to three': 'equals three',
  'equals three': function () {
    assert.strictEqual(this.sum, 3);
  }
}

// Runs test as
describe('One plus two', function () {
  before(function () {
    // These are contained inside functions but have the same effect
    this.sum = 1;
    this.sum += 2;
  });

  it('is equal to three', function () {
    assert.strictEqual(this.sum, 3);
  });
});
```

I am quite satisfied with the current result. There are a few kinks to work out (e.g. JSON is unordered and can cause issues). I might try out [yamlish][yamlish] (a subset with only objects and arrays), a properietary nested interface, or even [markdown][markdown].

[yamlish]: https://github.com/isaacs/yamlish
[markdown]: http://daringfireball.net/projects/markdown/

[yamlish][yamlish] (same ordering issues as JSON)

```yaml
A strawberry:
  when washed:
    - is red
    - is tasty
```

Proprietary line-delimited markup

```
A strawberry
  when washed
    is red
    is tasty
```

[Markdown][markdown], ordered since it compiles to XML

```markdown
# A strawberry
## when washed
  - is red
  - is tasty
```

```markdown
# A strawberry
## when washed
### is red
### is tasty
```