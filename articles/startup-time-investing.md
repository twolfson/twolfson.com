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

# Operational tasks vs Product tasks

For any given company, there's a core set of operational tasks. Without these regularly occurring, the business would stop functioning. Here's a historical example for [Underdog.io][], a curated job candidate <-> company marketplace:

- Review new candidate applications
- Send out weekly email of new candidates to companies
- Onboard accepted candidates
- Ensure accepted candidates are enjoying experience
- Sell to new companies
- Onboard new companies
- Ensure onboarded companies are enjoying experience

[Underdog.io]: https://underdog.io/

In addition, there are product tasks. These are features which add value but the business could keep funcitoning without. For example:

- Migrate from an email based service to dashboard
- Add a new registration field for diversity and inclusion
- Integrate Google Sign-In

*This is very handwavy (e.g. excludes expansion concepts) but generally the following processes should extrapolate well.*

# Time usage for operational tasks

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

In fact, this was one of my first tasks at Underdog.io 😃

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

