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

![](/public/images/articles/practical-applications-of-the-dot-product/math-notation-refresher.tex.png)
<br/>
<small><i>"^" (aka hat) is known as the unit vector</i></small>

## Proof
Let the "orange" to "blue" vertices be our <b><i>axis vector</i></b> and "orange" to "green" be our <b><i>offshoot vector</i></b>. This is the largest proof so we’ll take it on in 3 steps.

![Axis/offshoot diagram](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-diagram.png)

## Step 1: Resolving cosine
We have an angle θ between our 2 vectors. This angle has 3 scenarios (assuming -π ≤ θ ≤ π):

![](/public/images/articles/practical-applications-of-the-dot-product/angle-lessThan-halfPi.png)
<br/>
<small><i>-π/2 < θ < π/2</i></small>

![](/public/images/articles/practical-applications-of-the-dot-product/angle-equals-halfPi.png)
<br/>
<small><i>θ = -π/2, θ = π/2</i></small>

![](/public/images/articles/practical-applications-of-the-dot-product/angle-greaterThan-halfPi.png)
<br/>
<small><i>-π ≤ θ < -π/2, π/2 < θ ≤ π</i></small>

In our first scenario (-π/2 ≤ θ < π/2), we first focus on 0 ≤ θ < π/2. For the sake of brevity, I’m going to handwave over the existence of a right triangle with our projection vector. Please see the gists at the end for a robust proof.

![](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Visualization of our right triangle</i></small>

By the [cosine trigonometric identity][], we have:

[cosine trigonometric identity]: https://en.wikipedia.org/wiki/Pythagorean_trigonometric_identity

![cos(theta) = axisProjectionLength / offshootLength](/public/images/articles/practical-applications-of-the-dot-product/projection__cosTheta-equals-axisProjectionLength-over-offshootLength.tex.png)

For -π/2 < θ < 0, we build a similar triangle and yield the same cos(θ) equation.

For our second scenario (θ = -π/2, θ = π/2), our offshoot vector is orthogonal and thus our projection vector is the zero vector. We can still use the same cos(θ) equation.

For our third scenario (-π ≤ θ < -π/2, π/2 < θ ≤ π), we will focus on π/2 < θ ≤ π. We build a right triangle similar to above but ours is with φ:

![-π ≤ θ < -π/2, π/2 < θ ≤ π visualization again](/public/images/articles/practical-applications-of-the-dot-product/angle-greaterThan-halfPi.png)
