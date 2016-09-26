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

When I started doing open source, I recognized the same problem immediately. I would return to a repo I wrote and be fully lost. After enough trial and error, here's what I found worked:

- Workflow oriented documentation (e.g. how to get started, which scripts do what, how to use them)
    - See [twolfson.com-scripts][] as an example
    - Self-documenting repositories are great for APIs but not amazing on concepts for developers
    - We need to be empathetic to how someone is using our repo which is a different mindset than we use while writing code
- Well commented repositories
    - Even in languages like Python, not all intentions are obvious. Comments are always better than nothing at all
- Well tested repositories
    - People do manual testing often but it's impractical if I can't remember my workflow 6 months later
    - This is aggravated further when we hire a new coworker who can't test on their own due to no automation
    - Sometimes manual tests are necessary outside of automated tests (e.g. verifying CLI options) but be sure to document those as well

[twolfson.com-scripts]: https://github.com/twolfson/twolfson.com-scripts/blob/2.6.4/README.md

Aside from this, I am trying another technique but have yet to see how it goes:

- Anything that must be done before landing a PR should cause test failures or the repository to fail (e.g. removing patched TODOs, removing a `.only` call from tests)
    - For example, add something that fails linting or a test case with a TODO in it and an `assert.fail`

In the scope of resumable projects (not only single repos):

- Granular but not overwhelming planning (e.g. Trello board with upcoming work for next few weeks, not next few months)
