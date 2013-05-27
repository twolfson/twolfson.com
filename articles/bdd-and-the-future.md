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

## Experiments
### Skeleton / Crossbones
GitHub: [TODO: crossbones link][crossbones]

For a while, I have been experimenting with BDD. At first, I wanted a cross-framework test runner from [vows][vows] to [mocha][mocha]. This was initially called [Skeleton][skeleton], later renamed to [Crossbones][crossbones] and was successfully implemented in the [Sauron][sauron] test suite.

[vows]:
[mocha]:
[skeleton]:
[crossbones]:
[sauron]:

This was great but I wanted something better. [Crossbones][crossbones] required writing the tests in their own framework which was similar to [vows][vows] but not vanilla [vows][vows] (exporting was weird).

```js
// TODO: Crossbones test samples
```

### Sculptor
GitHub: [TODO: sculptor link][sculptor]

A long while after [Crossbones][crossbones] and its ultimate neglect, I thought about writing a framework for cross-compiling test suites. The key reason here was to flatten test suites into TDD-compatible flavors for [testling][testling].

I began hacking on this and [got quite far][sculptor] (it works with wrapping [vows][vows] into [mocha][mocha] tests) but soon realized that compiling a test suite into another framework's test suite was a total mindfuck.

[sculptor]:

### doubleshot
GitHub: [TODO: doubleshot link][doubleshot]

After considering [Sculptor][sculptor] as an over-engineered project in attempt to find a holy grail.

>    I have begun to realize all of my "holy grails" are usually over-engineered items that I throw away a month later.

I decided to start on something much simpler and finer focus. I realized that saying `describe` versus typing out `topic` was a silly semantics issue. On previous projects (since the [initial writing of Crossbones][sauron-outline]), I have began to write out a specification for my test before writing the tests themselves.

[sauron-outline]:

I realized this was awesome and always had the side thought that the specification would become lost once I fill out the tests due to code bloat. I wanted a cleaner way in the same loose language to keep them around.

Upon this next iteration, I tried out splitting the outline from the content and fell in love with the latest format. [doubleshot][doubleshot] was born.

```js
// TODO: Doubleshot test sample
```

Shortly after writing, I discovered cool functionality I could build in (e.g. `aliasing` and `chaining` of methods).

```js
// TODO: Chaining example
```

I am quite satisfied with the current result. There are a few kinks to work out (e.g. JSON is unordered and can cause issues). I might try out [yamlish][yamlish] ( a subset with only objects and arrays), a properietary nested interface, or even [markdown][markdown].

[yamlish]:
[markdown]:

```markdown
# A banana
## when peeled
- is ripe
```