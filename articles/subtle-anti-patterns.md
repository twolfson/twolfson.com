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
### The pattern
```js
var bindingElts = [{
      'name': 'top-down',
      'fn': topDownFn
    }, {
      'name': 'left-right',
      'fn': leftRightFn
    }, {
      'name': 'diagonal',
      'fn': diagFn
    }];
bindingElts.forEach(function (bindingElt) {
  addAlgorithm(bindingElt.name, bindingElt.fn);
});
```

### Why this is bad
It is harder to distinguish items and account for one-off cases. Additionally, if there is an issue inside of the `forEach` itself, the stack trace will not inform you which item failed. The stack trace will provide the line number of `addAlgorithm` but nothing about the specific `bindingElt`.

### How to make it better
```js
addAlgorithm('top-down', topDownFn);
addAlgorithm('left-right', leftRightFn);
addAlgorithm('diagonal', diagFn);
```

This makes each item have a nice line number attached to the stack trace which will lead to faster debugging.

### Bonus
If there is a problem we need to debug, we can take the trouble-maker line and pass it through a one-off function first; isolating it from the noise of other bindings.

```js
function addAlgorithmDebug(name, fn) {
  console.log('Adding ' + name + ' to algorithms');
  algorithms[name] = fn;
  console.log('Done adding ' + name + ' to algorithms');
}
addAlgorithm('top-down', topDownFn);
addAlgorithmDebug('left-right', leftRightFn);
addAlgorithm('diagonal', diagFn);
```

Anti-pattern #3: Defining a finite set of similar types
-------------------------------------------------------
### The pattern
```js
var algorithms = {
      'top-down' : topDownFn,
      'left-right': leftRightFn,
      'diagonal' : diagFn
    };
```

### Why this is bad
This one honestly isn't that bad but it *can* be improved. This pattern unintentionally limits others from adding new items to the set. Additionally, there is no easy way to hook into addition to the set.

### How to make it better
As we have demonstrated in #1, we can use a function like `addAlgorithm`. Then, we can expose `addAlgorithm` to make setting up another one easily for others.

```js
var algorithms = {};
function addAlgorithm(name, fn) {
  algorithms[name] = fn;
}
addAlgorithm('top-down', topDownFn);
addAlgorithm('left-right', leftRightFn);
addAlgorithm('diagonal', diagFn);

module.exports = {
  'algorithms': algorithms,
  'addAlgorithm': addAlgorithm
};
```

### Bonus
What you might not notice at first glance is that `addAlgorithm` is the [Observer pattern](http://en.wikipedia.org/wiki/Observer_pattern).

```js
AlgorithmKeeper.on('add', function (name, fn) {
  algorithms[name] = fn;
});
AlgorithmKeeper.emit('add', 'top-down', topDownFn);
AlgorithmKeeper.emit('add', 'left-right', leftRightFn);
AlgorithmKeeper.emit('add', 'diagonal', diagFn);
```

However, we have placed sugar on top of it (and removed the need for a third party tracker). If we did go this route though, we could have other people listen and hook in to our algorithm addition events. **CRAZY AWESOME!!**

```js
AlgorithmKeeper.on('add', function (name) {
  console.log('Someone is adding a new algorithm: ' + name);
});
```

Anti-pattern #4: Composition of functions
-----------------------------------------
### The pattern
```js
function addSalt(str) {
  return str + 'salt';
}
function addPepper(str) {
  return str + 'pepper';
}

var pasta = 'pasta';
pasta = addSalt(addPepper(pasta));
```

### Why this is bad
Not quickly and easily readible.
However, the issue arises out of adding new items

```js
function addSauce(str) {
  return str + 'sauce';
}
function addRosemary(str) {
  return str + 'rosemary';
}

var pasta = 'pasta';
pasta = addSalt(addPepper(addSauce(addRosemary(pasta))));
```

Ah, that is nice and [Lispy](http://en.wikipedia.org/wiki/Lisp_%28programming_language%29) now. We could add line feeds or break it into separate lines but that is lipstick on a pig.

The worst would be to add all 4 functions into a single function. Then, all one-off cases would eventually reach 16 functions `addSaltAndPepper`, `addSaltAndSauce`, &hellip;, `addSaltPepperSauceRosemary`. Clearly, that is not maintainable.

### How to make it better
If we step back, we can notice that we are constantly passing the same state into each function. Classes were **built** for this; functions are stateless and classes are stateful.

If we move this into a class with a fluent interface, life becomes awesome.

```js
function Food(str) {
  this.str = str;
}
Food.prototype = {
  'addSalt': function () {
    this.str += 'salt';
    return this;
  },
  'addPepper': function () {
    this.str += 'pepper';
    return this;
  },
  'addSauce': function () {
    this.str += 'sauce';
    return this;
  },
  'addRosemary': function () {
    this.str += 'rosemary';
    return this;
  }
};
var pasta = new Food('pasta');
pasta.addSalt().addPepper().addSauce().addRosemary();
```

**Side note**: If you have been paying attention, you might notice the prototype is a finite set. In this case, we *could* create an `addCondiment` method but most prototypes are varied enough to avoid this circumstance.