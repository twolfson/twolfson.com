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

## Axiom of nothing

If a `line` contains no characters except for a `terminal character`, it has no `cost of maintainenance`. The following example is intentionally blank.

```js

```

## Axiom of something

If a `line` that contains at least one character that is not a `terminal character`, has a non-zero `maintenance cost`.


## Axiom of addition

If there are multiple lines of code, the maintenance cost is the sum of each line's maintenance cost.

```js
//
```