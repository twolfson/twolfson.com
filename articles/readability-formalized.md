{
  "title": "Readability: Formalized",
  "author": "Todd Wolfson",
  "_date": "2013/08/15",
  "date": "Aug 15 2013 01:00:00",
  "_summary": "Defining readability with axioms and theorems."
}

This article will define readability from an objective perspective using formal definitions, axioms, and theorems.

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

There is an added effect when syntax highlighting is brought into the mix which highlights sections within the layouts/sequences, making them even easier to recognize.

```js
function similarFunction(var2) {
  console.log('Another variable', var2);
}
```

This also supports my theory/experiment on [applying vertical rhythm to code][vert-rhythm].

[vert-rhythm]: /2013-05-27-bringing-vertical-rhythm-to-code

## Definitions

Pattern - Repeated layout of

> Code often becomes more readible with syntax highlighting as this defines another pattern layer based on color. It allows code patterns to be located (and consequently interpretted) faster.