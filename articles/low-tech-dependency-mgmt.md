{
  "title": "Low tech dependency management via grunt tasks",
  "author": "Todd Wolfson",
  "date": "2014/01/19",
  "keywords": "low tech, dependency, bower, volo, jam, curl",
  "summary": "An explanation and walkthrough of managing browser dependencies via [`grunt-zip`](https://github.com/twolfson/grunt-zip/) and [`grunt-curl`](https://github.com/twolfson/grunt-curl)."
}

Every project has an investment cost; an acceptable balance between effort put in now and effort saved later.

Higher level browser dependency solutions like [bower][] and [component][] work great for larger projects but not might be a quick drop-in solution for smaller projects. Additionally, they require opt-in support from repository owners which is not always available (e.g. on [microjs][] projects).

[bower]:
[component]:
[microjs]: http://microjs.com/

My solution for these projects is a combination of [grunt][] tasks that download

[grunt]: