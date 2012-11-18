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
// Most common form
var algorithms = {};
algorithms['top-down'] = topDownFn;
algorithms['left-right'] = leftRightFn;
algorithms['diagonal'] = diagFn;
```

### Why this is bad

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
