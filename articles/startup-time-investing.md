{
  <!-- TODO: Rename to "Startup time usage and investing?" -->
  "title": "Startup time investing",
  "author": "Todd Wolfson",
  "date": "2022-07-30T19:00:57-0700",
  "keywords": "startup, time, time investment",
  "summary": "TODO: Summarize me, and update keywords"
}

You're at a startup, you have a finite number of hours in a week. How do you determine what to build, what to prioritize, and what to even do?

<!-- Trying something new, like an intro hook to a YouTube video. Intro line then personal line as an aside -->

> Hi, I'm Todd. I'm a startup engineer; 3x first engineer, former Uber engineer, and have worked at many more startups. In this article, I'll be covering how to use and invest your hours at a startup.

<!-- TODO: Does this stylistically work? Do we need something new in our UI? -->

There's an unwritten list of competing tasks and priorities that organically occur through the process of running a startup. These can vary wildly so I'm going to start with an example from [Underdog.io][], a curated job candidate <-> company marketplace:

- Review new candidate applications
- Send out weekly batch of new candidates to companies
- Onboard accepted candidates
- Ensure accepted candidates are enjoying experience
- Sell to new companies
- Onboard new companies
- Ensure onboarded companies are enjoying experience
- Find any highly requested features
- Build said new features

[Underdog.io]: https://underdog.io/

This is a **very** reductive list of what we did at [Underdog.io][], and I'll provide more examples at the bottom (TODO), but it's where we'll start.

One thing you'll notice that's not on this list, is how much time each of these tasks takes.

The nuance is that each task can be fast or slow, depending on how much time has been invested in the process. **This is the nuance we'll be discussing.**

The blueprint for how we can speed up a given task depends on a lot on the task, so I'm going to walk through various examples:

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

