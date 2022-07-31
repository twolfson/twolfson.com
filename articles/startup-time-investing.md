{
  <!-- TODO: Rename to "Startup time usage and investing?" -->
  "title": "Startup time investing",
  "author": "Todd Wolfson",
  "date": "2022-07-30T19:00:57-0700",
  "keywords": "startup, time, time investment",
  "summary": "TODO: Summarize me, and update keywords"
}

I'm a startup engineer; 3x first engineer, former Uber engineer, and have worked at many more startups.

In this article, I cover how I orient around business priorities, when to invest time in improving processes, and when to not.

The following is a linear workflow that I go through at the start of every day, end of every day, and every time a new task is discussed. The frequency is so high is because startup priorities can shift daily (e.g. no longer shipping X on date Y but now date Z).

# Obligated work first
To keep expectations consistent and velocity high, I like to complete obligated work first.<br/>That is, work where either I'm blocking someone or there was a promised deadline (e.g. code review for person X, output data for person Y).

# Non-obligated work second
As expected, we then prioritize non-obligated work second (e.g. build feature X, patch bug Y).

TODO: We're still missing nuance here like layout out upcoming due work by dates

and honestly, getting into the weeds on personal process at this point. Losing the high value of the article for discussing time investment

---

# Sizing up tasks
Within these obligated vs non-obligated groupings, I then do another pass based on the type of task. As a programmer, the categories usually are:

- Operational, something that's required to keep the business functioning
  - e.g. For [Underdog.io][], a curated job candidate <-> company marketplace, we'd send out a weekly email of new candidates to companies
  <!-- TODO: This is long, can we shorten it? -->
- Feature, something to add or upgrade for our offerings
  - e.g. Integrate Google Sign-In
- Bug, something has gone wrong with an existing feature
  - e.g. We saw a "Server Error" during a sign-up today

[Underdog.io]: https://underdog.io/

*Note: It's important to remember that at a startup, I'm not just sizing up my work but also looking for inefficiencies in my coworker's work and how I can help reduce those.<br/>
i.e. On a team of 3, if only the actor thought about their work, it's 1 head, whereas all 3 is 3 heads.*

# Sizing up operational tasks
[//]: # "Dunkin Donuts: Time to make the donuts"
[//]: # "https://www.youtube.com/watch?v=XyZtMfMWONI"
<p>It's "time to make the donuts":<br/>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/XyZtMfMWONI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/></p>

When analyzing operational tasks, I look at them through 2 lenses:

- How much time will it cost to do this task right now?
  - Is it just my time? Or are there multiple people involved?
- What are the time cost vs savings for improving this task?
  - How frequently does this task occur?
  - How long do we expect to keep doing this task?
  - Is it possible to stop doing this task?
  - For each way we can improve it:
    - How long would this improvement take?
    - What would the current time cost be afterwards?
    - Would there be any tangential pros/cons from this approach? (e.g. less human error)

Let's talk through a historical example. Every week [Underdog.io][] would send out a weekly email with new candidates to companies. Here's the context:

- All data was stored in a Google Sheet as database ([explanation](/2021-06-24-lessons-of-a-startup-engineer#every-decision-is-a-business-decision))
- Candidates specified companies to opt-out from (e.g. current employer)
- New candidates were copy/pasted by hand for each company (due to opt-out), pasted into email, and sent

Now let's talk through our questions:

- How much time will it cost to do this task right now?
  - *Q: Is it just my time? Or are there multiple people involved?*
  - A: 1 person (non-engineer), historical guesstimate 10 minutes per company
  - Thus, while it's fast with a small customer base, it definitely won't scale up
- What are the time cost vs savings for improving this task?
  - *Q: How frequently does this task occur?*
  - A: Every week<br/><br/>
  - *Q: How long do we expect to keep doing this task?*
  - A: Indefinite until business model changes
    - Read as: A fuzzy 6 months. i.e. In my experience, in startups if anyone tries to predict beyond 6 months, then the guess is usually wrong<br/><br/>
  - *Q: Is it possible to stop doing this task?*
  - A: Not at the moment, though possibly if we moved to a dashboard<br/><br/>
  - *Q: How can we improve it?*
  - A: Option A: Build an internal tool to generate and review batches
    - *Q: How long would this improvement take?*
    - A: With existing internal tool infrastructure, 2 weeks of engineering time<br/><br/>
    - *Q: What would the current time cost be afterwards?*
    - A: Significantly reduced to only engineering maintenance (its own operational task)<br/><br/>
    - *Q: Would there be any tangential pros/cons from this approach? (e.g. less human error)*
    - A: Pro: Engineering can add checks for opt-out in case someone had a typo
    - A: Pro: Sets up path for full automation after trust established
    - A: Con: Lose flexibility to put human touch into each email (without building for that)
  - A: Other options: Skipping over these in example

So we've laid out our options and the time cost comparisons. How do we determine if this is a current priority or not?

Honestly, this is kind of an artform that comes from experience =/ I lean on a few principles here:

- Pain tolerance
  - How much do I dislike doing this task? Or do others dislike doing it?
  - A [current coworker][Ryan Barrett] has phrased this as "Do it until it hurts"
- If we pick up this this task now, what is being deprioritized? ([Every decision is a business decision][])
- [Build exactly what you need][] or [YAGNI][]

[Ryan Barrett]: https://snarfed.org/
[Every decision is a business decision]: /2021-06-24-lessons-of-a-startup-engineer#every-decision-is-a-business-decision
[build exactly what you need]: /2021-06-24-lessons-of-a-startup-engineer#build-exactly-what-you-need
[YAGNI]: https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it

In [Underdog.io][]'s case, this was very high priority since the company list kept growing (good problem to have) so it was consuming full Sundays for that 1 person.

# Dialog on time investment
At this point, I'd like to reframe how I think about time investment for operational tasks.

It's like for each task, we're investing in a better mode of transportation. e.g. We might start as a pedestrian, then get a bicycle, and eventually we get to a rocketship!

[//]: # "https://quickchart.io/sandbox#%7B%0A%20%20%22type%22%3A%20%22horizontalBar%22%2C%0A%20%20%22data%22%3A%20%7B%0A%20%20%20%20%22labels%22%3A%20%5B%0A%20%20%20%20%20%20%22January%22%2C%0A%20%20%20%20%20%20%22February%22%2C%0A%20%20%20%20%20%20%22March%22%2C%0A%20%20%20%20%20%20%22April%22%2C%0A%20%20%20%20%20%20%22May%22%2C%0A%20%20%20%20%20%20%22June%22%2C%0A%20%20%20%20%20%20%22July%22%0A%20%20%20%20%5D%2C%0A%20%20%20%20%22datasets%22%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%22Dataset%201%22%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22rgba(255%2C%2099%2C%20132%2C%200.5)%22%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgb(255%2C%2099%2C%20132)%22%2C%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20-32%2C%0A%20%20%20%20%20%20%20%20%20%2062%2C%0A%20%20%20%20%20%20%20%20%20%2064%2C%0A%20%20%20%20%20%20%20%20%20%2041%2C%0A%20%20%20%20%20%20%20%20%20%20-31%2C%0A%20%20%20%20%20%20%20%20%20%20-32%2C%0A%20%20%20%20%20%20%20%20%20%2087%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%22Dataset%202%22%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22rgba(54%2C%20162%2C%20235%2C%200.5)%22%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgb(54%2C%20162%2C%20235)%22%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%209%2C%0A%20%20%20%20%20%20%20%20%20%20-100%2C%0A%20%20%20%20%20%20%20%20%20%20-13%2C%0A%20%20%20%20%20%20%20%20%20%2064%2C%0A%20%20%20%20%20%20%20%20%20%20-57%2C%0A%20%20%20%20%20%20%20%20%20%2026%2C%0A%20%20%20%20%20%20%20%20%20%2020%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%0A%20%20%7D%2C%0A%20%20%22options%22%3A%20%7B%0A%20%20%20%20%22elements%22%3A%20%7B%0A%20%20%20%20%20%20%22rectangle%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%202%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22responsive%22%3A%20true%2C%0A%20%20%20%20%22legend%22%3A%20%7B%0A%20%20%20%20%20%20%22position%22%3A%20%22right%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22title%22%3A%20%7B%0A%20%20%20%20%20%20%22display%22%3A%20true%2C%0A%20%20%20%20%20%20%22text%22%3A%20%22Chart.js%20Horizontal%20Bar%20Chart%22%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"
[//]: # (LibreOffice could be comparable size but wound up fighting on unique coloring)
[//]: # (Bar chart misses nuance that speed doesn't always match time investment, and these investments are in tension -- spider graph was right, kind of...)
<!-- Initially we had an spider graph, but I think a bar chart works better -->
<!-- TODO: Delete spider graph -->

![Bar graph of different transportation modes](/public/images/articles/startup-time-investing/chart.webp)


However, if you realize that you no longer need to do a given task, then you can't get a refund on that time spent. i.e. You can't get a refund on your rocketship.

*Note: Some improvements may level up multiple operational tasks concurrently (e.g. internal tools, developer tooling), which is always great.*

*Tangent: This dialog also plays well "build vs buy" considerations, except it's money spent instead of time spent.*

---
---
---

- Do we know how long this would/should take?
- Is there anything we can do to reduce this down?

If it's a blocker or has a promised deadline, I usually then verify that it *can* be done within a reasonable timeframe.

i.e. If we don't know how long it should take, I do the work here (e.g. for bugs, triage them; for features in a new domain, research and/or proof of concept them).

Once that's settled, we can either move ahead with that or start thinking/discussing how to reduce it down into something that will work

TODO: Finish the thought here, feel like we missed a paragraph

----
----
----
----
----

# Operations vs features vs bugs
As a startup engineer, tasks typically fall into 1 of 3 categories:


# Time usage for operational tasks

-------

TODO: Might make sense to move to the bottom since technically product tasks become operational tasks through maintenance requirements.

At this point, I'd like to call out a strong nuance that tricks people new to startups.<br/>The answer to "How long do we expect to keep doing this task?" is almost always very wrong, but you don't know it until it changes overnight.

<!-- TODO: Relevant XKCD? https://xkcd.com/1205/ -->

-----------

## Send out weekly batch of new candidates to companies
For a starting point, we're going to begin with the contrived worst-case MVP implementation for candidate batches:

> This is not how Underdog.io actually did things, we had the foresight to use Google Sheets as our initial database, thus foregoing the intermediary engineering steps.

-

- All data was written into a Google Sheet
  - TODO: See "Lessons of a startup engineer" for explanation why
- Candidate review occurrs within said Google Sheet
  - In practice, there was an internal tool built early on
- Candidates specify companies to not be sent to
- Batches are manually constructed for each company, pasted into email, peer reviewed, and sent

If you're reading this and feel like "this sounds like a really slow and error-prone proces", you'd be right!

In fact, this was one of my first tasks at Underdog.io =)

> I should note that the Google Sheet actually simplified the process at this point.
>
> There could have been another version where the data was input into a database and an engineer would dump the data to a CSV for review, then load the data back in via a script

-

TODO: Talk through examples which cannot be automated as much (e.g. sales)

TODO: Delegation model:

- Eng -> Support -> Customer -> Support -> Eng
- Support -> Customer -> Support
- Customer

- One-off commands run via SQL / REPL
- One-off peer-reviewed script run via CLI
- Committed script run via CLI
- Committed script run via a button in an engineering only UI
- Committed script run via a button in operational tooling UI
- Self-serve action that user can take

- No storage vs localStorage vs DB save

- Manual review vs automated review for user-based input (e.g. ID verification)

- Heroku single server vs Digital Ocean single server vs Digital Ocean load balancer + multi-server vs multi-provider
  - Similarly deployment script

- Architecture: Monolith vs SOA vs micro-services
- Architecture: API + UI vs Monolith

TODO: Pain tolerance for doing a task

TODO: Time to make the donuts meme

TODO: Every decision is a business decision (again) and YAGNI

TODO: Decide on keeping article approachable to anyone vs focusing in on engineers with examples

TODO: Talk through various company hats?

--------

There's a few ways we can speed up a given task:

- Automation
- Specialization
- Delegation
- TODO: Any others?

Not in the list but worth mentioning now:

- Building internal tools
- Building scripts
- Technical decisions as business decisions
- YAGNI again
- Hiring

TODO: Example lists as well for Find Work and Standard Cyborg

TODO: Talk through major moments like company pivots or running faster

--------

Example list:

-

This
<!-- TODO: Rework this content, def don't need upfront piece, just easier to start writing like this -->

In my last post (startup engineering lessons), from a long time ago, I'd mentioned building for run in a certain direction.

I've tried to strain this analogy more than it goes, and realized it's a different once entirely

It's more like a compass with many different directions (or like a spider chart if that's your thing)

TODO: Insert an image
<!-- /home/todd/github/twolfson.com/articles/startup-time-investing/compass.jpg -->
<!-- TODO: Polish up image -->

"""
Standard was a whole new product
Underdog was integrating more systems into an SOA
Beyond just engineering. Do business relationships change? Business model? Level of interaction for customers? product market fit
"""

I also called this velocity in original summary?

I guess there is an implication that you also don't want to run too fast in a given direction?

---

Programmers: This includes operational tasks like deployments

---

TODO. Read old post for repetition

---

Maybe categorization or characterization of tasks
Bug reports fit neither mode since it's about people

Prob no good system for all tasks
More of a framework for orienting

---

Arrows are important because they represent velocity

---


Did not cover handling blocking tasks. Maybe worth an online mention then longer call-out at bottom

---

Focus on just product eng tasks
So operational, features, and bugs

---

2x2 matrix layout, technically better communication but feels lacking for tension and very reductive of nuance that they each get invested in their own way

---

TODO: When to do all this prioritization math
