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

Pattern set - A [multiset][] of how many times a pattern **reoccurs** in a *sequence*.

*Pattern set of {2&#183;b, 2&#183;c}, where b = 'Exporting to a module', c = 'Common variable definitions':*

[multiset]: http://en.wikipedia.org/wiki/Multiset

```js
exports.add = function (a, b) {
  return a + b;
};

exports.subtract = function (a, b) {
  return a - b;
};
```

Readability - [Cardinality][] of a pattern set; sum of the times each pattern occurs.

*The previous example had a readability of 4.*

[Cardinality]: http://en.wikipedia.org/wiki/Multiset#Multiplicity_function

## Proofs

**Proposition 1.1**: A *sequence* with indented code blocks is more readable than it is not indented.

```js
var fruit = {
type: 'banana',
ripe: true
};
if (fruit.ripe) {
console.log('The ' + fruit.type + ' is ready to eat');
}
```

```js
var fruit = {
  type: 'banana',
  ripe: true
};
if (fruit.ripe) {
  console.log('The ' + fruit.type + ' is ready to eat');
}
```

**Proof**:

Let `A` be a *sequence* containing code blocks with no identation. Let `a` be the *pattern set* of `A`. By definition,

```
a = {n_1·v_1, ..., n_m·v_m}, n_i = non-negative intenger, v_i = pattern
```

Let `c` represent a *pattern* of indenting code blocks. Let `B` be the indented version of `A` and `b` be its the *pattern set*. By construction,

```
b = {n_1·v_1, ..., n_m·v_m, n_c·c}
```

The readability of `a` is

```
a = n_1 + ... + n_m
```

and that of `b` is

```
b = n_1 + ... + n_m + n_c
```

By transitivity of equality,

```
b - n_c = n_1 + ... + n_m
b - n_c = a
b - a = n_c
```

Therefore, `B` has a readability of `n_c` greather than `A`.

----------------

The purpose of **Proposition 1.1** was to get you back into the proof solving mindset. There is a more general solution that exists for any sequence with more patterns.

**Theorem 1.2**: A *sequence* is more readable with more patterns.

**Proof**:

Drawing from the solution of **Proposition 1.1**, we can apply the same steps. However, instead of defining a pattern specifically, we would define the same sequence with more patterns such that the pattern set of `A` is a proper subset of the pattern set of `B`.

From that, it falls out that the cardinality of a proper subset is always less than the cardinality of its containing set.

------------

As any suspicious reader might argue, the previous theorem encourages *pattern* abuse. If *patterns* are being abused, then it is no longer possible to distinguishm due to the amplitude of noise. i.e. They are no longer distinguishable which by definition no longer makes them *patterns*.

Here are few lemmas which we can draw from the **Theorem 1.2**.

**Lemma 1.3**: Coding styles that break into code chunks are more readable.

```js
```

**Lemma 1.4**: Syntax highlighted code is more readable than unhighlighted code as sequences.

**Lemma 1.5**: [As in Python][colons-required], using `:` to distinguish conditionals and loops improves readability.

[colons-required]: http://docs.python.org/2/faq/design.html#why-are-colons-required-for-the-if-while-def-class-statements

**Lemma 1.6**: Using consistent groupings of comments and code chunks is more readable than not.

## Take aways
The main take away I want for you is to look at code more than an interface from you to your interpreter/compiler. There is an intermediary layer of you to your editor where you must interpret what it displays.

The more patterns you have established, the faster you can scan through your code.

However, don't go off and enforce your coding styles by hand. This is something that can easily be automated. If your patterns are too complex to write into a script, then your patterns are too complex for your brain (or your coworkers') to automatically pick up.
