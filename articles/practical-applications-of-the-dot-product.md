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
As a courtesy to those who haven't touched Math in a while, here's some notation Linear Algebra notation we'll be using:

![](/public/images/articles/practical-applications-of-the-dot-product/math-notation-refresher.tex.png)
<br/>
<small><i>"^" (aka hat) is known as the unit vector</i></small>

## Proof
Let the "orange" to "blue" vertices be our <b><i>axis vector</i></b> and "orange" to "green" be our <b><i>offshoot vector</i></b>. This is the largest proof so we'll take it on in 3 steps.

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

In our first scenario (-π/2 ≤ θ < π/2), we first focus on 0 ≤ θ < π/2. For the sake of brevity, I'm going to handwave over the existence of a right triangle with our projection vector. Please see the gists at the end for a robust proof.

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

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Cosine trigonometric identity for right triangles</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Definition of supplementary angles</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Substitution of φ</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Equivalence via cosine identities</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Multiplication by -1</i></small>

For our -π ≤ θ < -π/2 case, we build a similar triangle and yield the same cos(θ) equation.

Now that we've resolve cosine for each of our scenarios, we can consolidate them. If cos(θ) ≥ 0, then let <b><i>d = 1</i></b>. Otherwise, let <b><i>d = -1</i></b>. This allows us to restate:

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>New cosine definition with direction</i></small>

Additionally, we can define our projection unit vector using <b><i>d</i></b>:

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Piece-wise axis projection unit vector definition</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Direction based axis projection unit vector definition</i></small>

## Step 2: Restructure dot product
To make our final derivation easier, we're going to restructure the dot product a little. First, let's start by writing out more knowns:

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Definition of unit vectors</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Dot product derivation from <http://heaveninthebackyard.blogspot.com/2011/12/derivation-of-dot-product-formula.html></i></small>

With these knowns, we restructure our axis projection vector as follows:

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Taken from knowns above</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Substitute cosine with equation from previous step</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Cancel out fractions</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Divide both sides by direction and axis vector length</i></small>

## Step 3: Calculate projection vector
![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Taken from knowns above</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Substitute unit vectors and axis projection length from previous steps</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Cancel out directions</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Substitute unit vector definition</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Simplify formula to vector times a scalar</i></small>

And there we go, we have our formula for a projection vector:

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)

# Finding the orthogonal component of a vector to another vector
With the calculation above, we can derive an orthogonal component of a vector with respect to another vector

TODO: Convert to embed
https://codepen.io/twolfson/embed/preview/MEXaEq?default-tabs=js%2Cresult&embed-version=2&height=600&host=https%3A%2F%2Fcodepen.io&referrer=https%3A%2F%2Fmedium.com%2Fmedia%2Fee573941d297cceb9fb992c4d971594a%3FpostId%3Dc5503c2e454e&slug-hash=MEXaEq

This is practical for computing an angle between 2 vectors around a given axis in 3 dimensional space (e.g. rotation around a fixed axis).

For the proof, we've already resolved this vector via our right triangle construction; it's the "opposite" edge (i.e. our green line). As a result, we can use vector addition to resolve our orthogonal vector:

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Construction of our vector via its right triangle</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Subtraction and rearrangement of vectors</i></small>

For some sanity, we can also think of our vector space with our axis as an actual axis:

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Definition of offshoot in terms of vectors</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Definition of axisProjection in terms of vectors</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Subtraction of our definitions and proof of orthogonality</i></small>

# Finding the shortest distance from a point to a segment
TODO: Convert to embed
https://codepen.io/twolfson/embed/preview/MEMZrR?default-tabs=js%2Cresult&embed-version=2&height=600&host=https%3A%2F%2Fcodepen.io&referrer=https%3A%2F%2Fmedium.com%2Fmedia%2Fb29189a9429ef1211dc3568629b9841e%3FpostId%3Dc5503c2e454e&slug-hash=MEMZrR

For this proof, we will solve it in a piece-wise fashion. There are 3 scenarios:

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Our point is "behind" our segment</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Our point is "between" our segment</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Our point is "ahead of" our segment</i></small>

In the "behind" and "ahead of" scenarios, the shortest distance will be to the closest vertex. In the "between" scenario, the shortest distance will be a perpendicular line from the segment to the point.

To determine which of these scenarios our point falls into, we find the projection vector and compare it to our segment as a vector. We simplify this a little so it's a comparison between their scalars, not their vectors

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)

Equations:

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Previous resolution from "Projecting a vector onto a vector"</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Ratio between axis projection and axis vectors</i></small>

This ratio tells us how much of our offshoot vector is projecting onto our axis.

If the ratio is negative, then we know the point is "behind" our segment and our length is the distance from our "orange" point to "green" point:

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)

Otherwise if the ratio is greater than 1, then we know our projection vector is longer than the axis vector itself. Thus, the point is "ahead" of our segment and our length is the distance from our "blue" point to our "green" point:

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)

Otherwise, the ratio is between 0 and 1 inclusively, so our projection vector falls onto the segment. Thus, the shortest distance is a line perpendicular to the line. We've calculated this before via the orthogonal component of a vector:

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Ideal length definition</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Vector addition expansion</i></small>

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Substitution for axis projection calculation</i></small>

We can shorten this a little bit with some variable reuse:

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)
<br/>
<small><i>Substitution for ratio calculated above</i></small>

Here's our final solution in a piece-wise format:

![TODO: Update image](/public/images/articles/practical-applications-of-the-dot-product/axis-offshoot-triangle.png)

# Links
- Robust proof, KaTeX equations, and screenshots: <https://gist.github.com/twolfson/207556d7ac0cd5d04fa283f6062841ab>
- KaTeX screenshotting tool: <https://github.com/StandardCyborg/katex-screenshot>
- Projection vector demo gist: <https://gist.github.com/twolfson/c6927d3c854087f74096e65c0db87279>
- Orthogonal vector demo gist: <https://gist.github.com/twolfson/687bda8e59b1785d7eb7c9efcb095c54>
- Distance to segment demo gist: <https://gist.github.com/twolfson/5b1a1ed21a77bc0fdd215e80ee7225cb>
