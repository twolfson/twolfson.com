{
  "title": "Abandoned project: Kaleidoscope",
  "author": "Todd Wolfson",
  "date": "2013/07/24",
  "_summary": "Notes on idea for an in-browser solution for website-at-a-glance webpages"
}

Back in November 2012, I began working on a project titled [kaleidoscope][]. The idea was a script that would take screenshots of multiple webpages in the browser and display them in a grid on a website. Each image would automatically refresh as any file it used was updated and it would be entirely standalone within the browser.

[kaleidoscope]: https://github.com/twolfson/kaleidoscope

The reason for this was updating one line of CSS verifying isolated changes for a single page which requires checking multiple webpages.

If the technology sounds far-fetched, it is not and I had a working proof of concept.

## Pre-existing technology

- [Resource-Collector][rc] can collect the information of resources from a webpage, and in theory even the information from an iframe.

- [File-Watcher][fw] can watch a list of resources for changes.

- [domvas][] converts any HTML element into an image

[rc]: https://github.com/twolfson/Resource-Collector
[fw]: https://github.com/twolfson/File-Watcher
[domvas]: https://github.com/pbakaus/domvas

## Technology built

- [iframe2image][], wrapper on top of [domvas][] that takes an `iframe` element and returns an image

- [snapshot.js][], wrapper on top of [iframe2image][] that takes a URL, generates an `iframe`, and returns an image

- [kaleidoscope][] takes screenshots of webpages via multiple engines ([snapshot.js][], [screenshot-as-a-service][]) and draws them to a grid system

[iframe2image]: https://github.com/twolfson/iframe2image
[snapshot.js]: https://github.com/twolfson/snapshot
[screenshot-as-a-service]: https://github.com/fzaninotto/screenshot-as-a-service

## Results
[snapshot.js][] was intended to be the flagship `engine`. However, due to implementation bugs in `svg+xml` images, it would not render some properties properly (e.g. `background-image`, `box-shadow`).

[![snapshot.js working][kaleido-snapshot]][kaleido-snapshot]

[kaleido-snapshot]: /public/images/articles/kaleido-snapshot.png

However, the grid system with [screenshot-as-a-service][] worked quite well.

[![screenshot-as-a-service working][kaleido-screenshot]][kaleido-screenshot]

[kaleido-screenshot]: /public/images/articles/kaleido-screenshot-as-a-service.png

## Why the abandonment?
I am marking this project as a failed experiment since the in-browser results would not render properly. It is great that I got it workign with [screenshot-as-a-service][] but the purpose of the experiment was to be standlone in the browser.

The reason I am marking it as abandoned now rather than back then is I know what the next steps forward are; perceptual diffs. These are starting to show up more and more, [Depicted][dpxdt] being the most identifiable service.

[dpxdt]: https://github.com/bslatkin/dpxdt

tl;dr on perceptual diffs, take your original screenshot, change some code, take a new screenshot, take the visual difference of the images. Here are some images from an [article on it][aurora2].

[![Perceptual diff][perceptual-diff]][perceptual-diff]

[aurora2]: http://tilander.org/aurora2/Comparing_Images/
[perceptual-diff]: /public/images/articles/kaleido-perceptual-diff.png

A computer can pick up more subtle changes than a human can and magnify them for human consumption. Additionally, it can test out multiple webpages and tell if the state has changed or not for them.

I am currently thinking everything is a nail and looking forward to building tools to test with perceptual diffs. Adding perceptual diffs to a test suite will allow for quick and painless refactors of CSS and switching of templating engines. I am very eager to get started.
