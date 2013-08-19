{
  "title": "Readability: Formalized",
  "author": "Todd Wolfson",
  "_date": "2013/08/15",
  "date": "Aug 15 2013 01:00:00",
  "_summary": "Defining readability with [axioms](http://en.wikipedia.org/wiki/Axiom) and [theorems](http://en.wikipedia.org/wiki/Theorem)."
}

This article will define readability from an objective perspective using formal [definitions][defn], [axioms][axiom], and [theorems][theorem].

[defn]: http://en.wikipedia.org/wiki/Definition
[axiom]: http://en.wikipedia.org/wiki/Axiom
[theorem]: http://en.wikipedia.org/wiki/Theorem

## Summary
Readability is the consistency of patterns (e.g. layout, sequence) in a file, project, organization, and programming language. Having common patterns allows sections (e.g. variable declarations) to be recognized and interpretted faster.

```no-highlight
function thisIsAFunction(var1) {
  console.log('Variable', var1);
}

function similarFunction(var2) {
  console.log('Another variable', var2);
}

var dissimilarFunction = function () {
  console.log('Another variable', arguments[0]);
}
```

There is an cumulative effect when syntax highlighting is used which distinguishes sections even further.

```js
function similarFunction(var2) {
  console.log('Another variable', var2);
}
```

This also supports my theory/experiment on [applying vertical rhythm to code][vert-rhythm].

[vert-rhythm]: /2013-05-27-bringing-vertical-rhythm-to-code

## Definitions

Sequence - Array of characters which can as little as a letter and as much as multiple lines.

*Sequence of variable instantiations:*

```js
var assert = require('assert'),
    request = require('request');
```

*Sequence of exporting a module:*

```js
module.exports = function assertedRequest(url, cb) {
  assert(url, '`url` was not defined');
  request(url, cb);
};
```

Subsequence - A sequence is strictly contained within another sequence.

Pattern - A sequence containing distinguishable subsequences.

Consistent - Given two patterns, the patterns are said to be consistent if their subsequences have the same order and purpose.

## Axioms

### Axiom of reflexivity

A pattern is consistent with itself.

### Axiom of transitivity

If pattern A is consistent with pattern B, and pattern B is consistent with pattern C. Then, pattern A is consistent with pattern C.

### Axiom of readability

// TODO: This might be misplaced as a definition

If a pattern is consistent with another pattern, then they are considered readable together.

// TODOS...

This is a aksdnakd

andlnsd

akdnasnd

adkmnalsdn

alksndlkand

aklsndl

<!-- If project A uses patterns X, Y, Z and project B uses patterns U, V, W. Is the collective readability of R(A + B) <= R(A) + R(B)? -->

Given projects A and B. Is the collective readability of R(A + B) <= R(A) + R(B)?

Define R to be a function that takes the ammount of common layouts in a project.

R is not 1:1 (e.g. A could use X, Y, Z and B could use U, V, W but R(A) === R(B) is possible).

If a project uses 1 layout, then adding another layout decrease readability? Maybe. Maybe not.

TODO: Rename all patterns to layouts.