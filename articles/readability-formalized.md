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

Readability - A function that takes a *sequence* and returns a numeric value. For convention, a value of 0 will signify *not readable*. A file that uses different coding styles is less readable than one that uses a consistent coding style.

*Theorem: Coding styles that use whitespace to delimit sequences are more readable since sequences can be distinguished faster.*

*Theorem: Syntax highlighted code is more readable than unhighlighted code as sequences can be distinguished faster.*

<!-- If project A uses patterns X, Y, Z and project B uses patterns U, V, W. Is the collective readability of R(A + B) <= R(A) + R(B)? -->

Given projects A and B. Is the collective readability of R(A + B) <= R(A) + R(B)?

Define R to be a function that takes the ammount of common layouts in a project.

R is not 1:1 (e.g. A could use X, Y, Z and B could use U, V, W but R(A) === R(B) is possible).

If a project uses 1 layout, then adding another layout decrease readability? Maybe. Maybe not.

TODO: Rename all patterns to layouts.










First proof: Indented blocks have higher readability than unindented ones

Second proof: Guido was right about using `:` for conditionals. Readability is improved as these are more distinguishable from other loops

Third proof: Code chunking improves readability

TODO: This might require each sequence to have a purpose =/

Fourth proof: Keeping commenting consistent among chunked pieces makes code more readable

Proposition: Does length limited code make it more readable?

Proposition: Is CoffeeScript less readable since invocations are less distinguishable?


TODO: Readability is amount of repeated patterns in a given set of text (may be multiple files).

TODO: Let A, B, C, U, V, W be patterns. Proof that R((U + V + W) + (A + B + C)) < R((A + B + C) + (A + B + C))










































