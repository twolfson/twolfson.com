{
  "title": "Resumable work",
  "author": "Todd Wolfson",
  "date": "2016-09-13T00:41:03-0500",
  "keywords": "resume, resumable, repositories, work",
  "summary": "Explanation of how to make repositories resumable for yourself and others"
}

Resumable work is code that is sufficiently documented, commented, and straight-forward that you and others can understand the author's intentions, continue work, and extrapolate future solutions.

With my recent return from Berlin to return to my work (see [Medium][]), I was reminded by how proper preparation can make or break a project.

[Medium]: https://medium.com/@twolfsn/back-to-the-grindstone-98dce7847f72

My first encounter with resumable work was playing [Harvest Moon][] in my childhood; I would take 6 month breaks and be fully disoriented when I returned. I tried writing pages of notes to my future self but it never work and only added to my aggravation.

[Harvest Moon]: https://en.wikipedia.org/wiki/Harvest_Moon_(video_game)

When I started doing open source, I recognized the same problem immediately. I would return to a repo I wrote and have no context. After enough trial and error, here's what I found worked:

- Workflow oriented documentation (e.g. how to get started, which scripts do what, how to use them)
    - See [twolfson.com-scripts][] as an example
    - Self-documenting repositories are great for APIs but not amazing on concepts for developers
    - We need to be empathetic to how someone is using our repo which is a different mindset than we use while writing code
- Well commented repositories
    - Even in languages like Python, not all intentions are obvious
    - Currently I use 2 comment variations: normal ones documenting the intent of code (e.g. look up users by their id) and `DEV:` comments for implementation reasons (e.g. we use `mkdir` with `-p` to avoid "File exists" issues)
- Automated testing
    - Manual or light testing can work for early stages of development but edge cases can easily be forgotten
    - If manual tests are required (e.g. verifying CLI options), then document them as part of the testing documentation

[twolfson.com-scripts]: https://github.com/twolfson/twolfson.com-scripts/blob/2.6.4/README.md

In the scope of larger work (e.g. multi-repo projects):

- Project planning
    - Short term planning (i.e. next few weeks) and granular down to 1 day tasks
    - Long term planning (i.e. next few months) should be vague and broad topics/goals
    - Anything that's a nice idea should be thrown into a backlog but not left on short term planning (this avoids overwhelming new/returning developers)
