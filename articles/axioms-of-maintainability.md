{
  "title": "Axioms of maintainability",
  "author": "Todd Wolfson",
  "date": "2013/07/11",
  "_summary": "TODO"
}

## ax·i·om (noun)

1. A statement or proposition that is regarded as being established, accepted, or self-evidently true.

2. A statement or proposition on which an abstractly defined structure is based.

## Introduction

In Math, axioms are foundational units used to built entire theories classifications upon (e.g. group theory, combinatorics). Without further ado, here are my axioms of maintainability.

## Definitions

`terminal character`, a [line feed][lf] or [end of file][eof] `character`.

[lf]:
[eof]:

`line`, an array of `characters` ending with a `terminal character` and not containing 2 or more `terminal characters`.

```js
// This is a line, as are the rest in this code fence.

console.log('Hello World!');
```

`maintenance cost`, metric used to measure how many actions must be taken when an alteration is made to any `character` or set of `characters` in a `line`. This is also known as `cost of maintnence`.

`zero`, the additive identity from [group theory][group].

`non-zero`, an element from a [group][group] that is not the additive identity/`zero`.

[group]:

## Axioms
### Axiom of emptiness

If a `line` contains no characters except for a `terminal character`, it has `zero` `cost of maintainenance`. The following example is intentionally blank.

```js

```

### Axiom of non-emptiness

If a `line` that contains at least one character that is not a `terminal character`, has a `non-zero` `maintenance cost`.

```js
// This `line` has a `non-zero` `maintenance cost` as does the next.
console.log('...but I am so innocent ;_;');
```

### Axiom of addition

Given multiple `lines`, the cumulative `maintenance cost` is the sum of each `line`'s ``maintenance cost`.

```js
// Assume this `line` has a `maintenance cost` of 1
console.log('and this has a `cost` of 5. Then, then the cumulative `cost` is 6');
```

## Applications
Now that we have a short and sweet set of definitions and axioms, it is time for some applications.

If you didn't notice, the `maintenance cost` is never defined in the theory; the application process should defines how a `cost` is calculated. In most cases, comments and whitespace are "cheap" to maintain:

```js
// This line costs `1` unit
    // This line costs `2` units since it has leading whitespace and a comment
```

and a line of code's `cost` depends on its complexity:

```js
console.log('In this application, I cost `5` units.');

// but the minified version of jQuery could cost 1000 units.
(function(e,t){var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p="1.9.1",f=c.concat,d=c.push,[...]
```

### Explaining why copy/paste is bad via theory
Let's assume your application looks like:

```js
var fs = require('fs'),
    http = require('http');

http.createServer(function (req, res) {
  // Send a valid status code
  res.writeHead(200);

  // Stream over file to response
  fs.createReadStream('info.json').pipe(res);
}).listen(3000);
```

We will give that a `maintenance code` of 20.

### Explaining why DRY code and abstraction is good via theory
