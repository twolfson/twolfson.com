{
  "title": "Practical applications of the dot product",
  "author": "Todd Wolfson",
  "date": "2017-10-30T00:00:00-0600",
  "keywords": "math, dot product",
  "summary": "An approachable introduction to the dot product and its uses"
}

This article was originally published on Medium:

<https://medium.com/vertices-and-faces/practical-applications-of-the-dot-product-c5503c2e454e>

-------------------------

I recently started at Standard Cyborg where I've been ramping up on Computational Geometry. I've started diving into our lower level source code to see how it ticks. This post documents my learnings about the dot product.

# What we'll cover:

- Projecting a vector onto a vector
- Finding the orthogonal component of a vector to another vector
- Finding the shortest distance from a point to a segment

# Projecting a vector onto a vector
Projecting a vector is one of the simpler practical things we can do with a dot product

TODO: Update me to an embed

https://codepen.io/twolfson/embed/preview/PJaqwg?default-tabs=js%2Cresult&embed-version=2&height=600&host=https%3A%2F%2Fcodepen.io&referrer=https%3A%2F%2Fmedium.com%2Fmedia%2Fe447ea96fc4b357baa2d984492a678fc%3FpostId%3Dc5503c2e454e&slug-hash=PJaqwg

Below is a proof explaining how the demo works. After that is a few shorter related demos and proofs.

## Math notation refresher
As a courtesy to those who haven’t touched Math in a while, here’s some notation Linear Algebra notation we’ll be using:
