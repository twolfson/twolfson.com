{
  "title": "Subtle anti-patterns",
  "author": "Todd Wolfson",
  "date": "2012/11/17"
}

**Warning: This article is more opinionated than other ones.**

As with everyone, I have began to develop opinions on certain styles of code; some concious and practical, others gutteral and more difficult to explain.

Below is a list of those that fall into the latter category but I have squeezed logic out of.

As a reminder, anti-patterns are not things that should be avoided at all costs; they have their place in quick and simple code. However, for maintainable and future-proof reasons, it is better to avoid them.

Anti-pattern #1: Writing directly to an object
----------------------------------------------
### The pattern
```js
var algorithms = {};
algorithms['top-down'] = topDownFn;
algorithms['left-right'] = leftRightFn;
algorithms['diagonal'] = diagFn;
```

### Why this is bad
You have written a direct reference to the map. However, what if you want to move to an array store or the variable becomes abstracted into a class. In either of those cases, those last 3 lines will have to be updated.

If that does not seem like a lot, imagine those were 20 lines and you wound up going back and forth a lot. There is a large margin for error and debugging will also not be fun.

This is not picking on `module.exports` definitions but it can be applied to some of those cases as well.

### How to make it better
Your first thought is probably "objectify them into an array and iterate over that array". This is not bad for a first thought but as you will see in #2, it still does not fully hit the mark.

It is best to abstract this into a helper function
```js
var algorithms = {};
function addAlgorithm(name, fn) {
  algorithms[name] = fn;
}
addAlgorithm('top-down', topDownFn);
addAlgorithm('left-right', leftRightFn);
addAlgorithm('diagonal', diagFn);
```

Now we have taken a direct connection and loosened it up a bit.

We can even go one step further and turn this into a full-fledged class.
```js
function AlgorithmKeeper() {
  this.algorithms = {};
}
AlgorithmKeeper.prototype = {
  'add': function (name, fn) {
    var algorithms = this.algorithms;
    algorithms[name] = fn;
  }
};
```

### Bonus
Now that we are going through a function, we can add additional one-off logic, effectively leaving the base function. This is great if the items you are adding are from a repo that you don't own.
```js
function addAlgorithm(params) {
  var name = params.name,
      algorithm = params.algorithm,
      defaults = params.defaults || {},
      saveFn = algorithm;

  // If defaults exist, override the saveFn to fallback to defaults
  if (defaults) {
    algorithm = function (data) {
      _.defaults(data, defaults);
      return algorithm(data);
    };
  }

  // Save our saveFn
  algorithms[name] = saveFn;
}
```


Anti-pattern #2: Binding by iterating over an array
---------------------------------------------------

Anti-pattern #3: Defining a finite set of similar types
-------------------------------------------------------
### The pattern
```js
var algorithms = {
      'top-down' : topDownFn,
      'left-right': leftRightFn;,
      'diagonal' : diagFn
    };
```

### Why this is bad


### How to make it better
Observer pattern =D
