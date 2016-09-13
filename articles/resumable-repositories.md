{
  "title": "Resumable work",
  "author": "Todd Wolfson",
  "date": "2016-09-13T00:41:03-0500",
  "keywords": "resume, resumable, repositories, work",
  "summary": "Explanation of how to make repositories resumable for yourself and others"
}

In the past few weeks, I return the USA, moved to Portland, and gotten back to working on my project. For more details, see:

TODO: Add link to Medium post

The earliest example of resumable work was from my childhood playing the game Harvest Moon. For the unenlightened, it's a farming game where you plant crops, harvest them, milk cows, collect eggs, etc. Every now and then, I would take these long breaks (e.g. 6 months) where I entirely forget about the game and then pick it up later. No matter what I did, I would always get frustrated as I couldn't recally what I was doing in the game (e.g. how long ago did I plant the crops?, did I have cows?) so I would always have to start over. I tried everything -- writing down long complex notes, writing down short ones, but nothing helped.

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
