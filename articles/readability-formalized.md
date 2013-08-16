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

Pattern - Array of characters containing distinguishable sequences or patterns.

