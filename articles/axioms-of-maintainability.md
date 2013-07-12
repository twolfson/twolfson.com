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

`terminal character`, a line feed or end of file character.

`line`, an array of characters ending with a terminal character and not containing 2 or more terminal characters. In simpler terms, any line that is non-empty (whether it is a comment, whitespace, code, or any combination of the three).

```js
// This is a line, as are the rest in this code fence.

console.log('Hello World!');
```

## Axiom of nothing

If there are no lines of code, there is no cost of maintainenance. The following is intentionally blank.

```js

```

## Axiom of addition

If there are multiple lines of code, the maintenance cost is the sum of each line's maintenance cost.

```js
//
```

## Addendum

There are tons of holes in this under mathematical scrutiny; I have not defined `sum`, `line of code`, `maintenance`, or `cost`.