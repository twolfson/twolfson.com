{
  "title": "Resumable work",
  "author": "Todd Wolfson",
  "date": "2016-09-13T00:41:03-0500",
  "keywords": "resume, resumable, repositories, work",
  "summary": "Explanation of how to make repositories resumable for yourself and others"
}

In the past month, I returned to the USA, moved to Portland, and resumed work on my project. For more details, see:

https://medium.com/@twolfsn/back-to-the-grindstone-98dce7847f72

Resumable work is code that has sufficiently documented, commented, and straight-forward that you and others can understand the author's intentions at the time of writing as well as extrapolate future solutions.

The first time I encountered resumable work (or the lack there of) was playing [Harvest Moon][] in my childhood; I would take 6 months breaks and be fully confused when I returned. I tried writing long pages of documentation to my future self but it only added to my aggravation.

[Harvest Moon]: https://en.wikipedia.org/wiki/Harvest_Moon_(video_game)

Later on in life, I started doing programming and encountered the same issue when resuming code I hadn't touched in a while (e.g. in a large repo, open source projects).

After this happening again and again, you start to learn what works and what doesn't work. This is what I found:

- Workflow oriented documentation/repositories (e.g. how to get started, which scripts do what, how to use them)
    - Self-documenting repositories are great for things like APIs but not amazing on concepts. We need to be empathetic to how someone is using our repo which is a different mindset than we use while writing code
- Well commented repositories
- Well tested repositories
    - People do manual testing often but it's impractical if I can't remember my workflow 6 months later. Let alone when a new coworker comes and attempts to contribute
- Anything that must be done before landing a PR should cause test failures or the repository to fail
    - We can't guarantee our rusty programming self will remember to run a `git grep TODO` everytime before landing a PR
    - In fact, I wouldn't even trust my non-rusty self to remember that every time (e.g. I have forgotten to remove a `.only` from tests plenty of times)

Beyond the scope of this:

- Consolidated internal documentation
- Granular but not overwhelming planning (e.g. Trello board with upcoming work for next few weeks)

TODO: Link to `twolfson.com-scripts` documentation
