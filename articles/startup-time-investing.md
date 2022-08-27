{
  <!-- TODO: Rename to "Startup time usage and investing?" -->
  "title": "Startup time investing",
  "author": "Todd Wolfson",
  "date": "2022-07-30T19:00:57-0700",
  "keywords": "startup, time, time investment",
  "summary": "TODO: Summarize me, and update keywords"
}

I'm a startup engineer; 3x first engineer, former Uber engineer, and have worked at many more startups.

In this article, I cover how I orient around operational processes, when to invest time in them, and when to not.

# Modes of transportation
An operational task is one that emerges as part of running a business (e.g. generating reports, onboarding customers, setting up a server).

Each of these tasks has a time cost associated with it (time to do the task) as well as the amount you've invested to make it faster.

![Bar graph of time spent vs time invested](/public/images/articles/startup-time-investing/time-comparison.svg)

I like to reframe the investment as a mode of transportation. i.e. If we invest the time and/or money into a bike/car/rocketship/etc, is it worth it?

![Same bar graph as above but with pedestrian and car emojis on it](/public/images/articles/startup-time-investing/time-comparison-with-modes.svg)

> Aside: One of my [engineering values][] is velocity (internal and external perception), so it makes sense that I lean into this analogy.

[engineering values]: https://vimeo.com/230142234

# Pain tolerance
Let's zoom in on an example recurring task. We're going to start with a contrived example but will have real-world examples at the bottom.

At Company X, they're a sales-oriented company and manually perform account creation to onboard a new customer.

On the no time invested side, we have the "slow and painful" version:

1. Sales finishes signing a contract with Customer
2. Sales notifies Engineering of the new registration
3. Engineering has no documentation, reads through code, figures out the commands, and thankfully nothing goes wrong
4. Partway through Engineering realize they're missing a critical field (e.g. [database color](https://dilbert.com/strip/1995-11-17)) and notifies Sales
5. Sales reaches out to the Customer
6. Customer replies to Sales
7. Sales notifies Engineering
8. Engineering completes onboarding and notifies Sales
9. Sales notifies Customer

On the maximal side, it's "fast and easy":

1. Customer signs contract, a webhook is triggered (set up by Engineering)
2. The webhook creates an account and sends an invite link to the Customer to self-serve onboard themselves

If you're an empath with low pain tolerance for monotony, then the latter "fast and easy" should feel a lot better from the perspectives of yourself, the rest of your team, and the customer.

If you don't feel this, then this article probably isn't for you =/

# Incremental improvements
So why did that first one feel so bad, what can we can we improve, and **when** can we find time to improve it?

Why it felt so bad: It was monotonous (sometimes "hurry up and wait", sometimes we've done it 100x before) as well as stressful (e.g. easily typo a command).

As for the other 2 questions, let's think about incremental improvements to get to "fast and easy", as well as how much time they'll take.

## Runbooks and note taking
The biggest impact low hanging fruit is that we haven't yet [invested in the fundamentals][] around documentation.

[invested in the fundamentals]: https://twolfson.com/2021-06-24-lessons-of-a-startup-engineer#invest-in-fundamentals

In this scenario, I take notes during the process, then clean up the notes afterwards for consumption by others. This form of documentation is called a runbook or a workflow.

By doing this, we now have commands to copy/paste, thus stress less and spend less time about getting code right next time.

Additionally, we've established a convention for the rest of the company to adopt. e.g. Sales + Engineering can create a runbook to verify all fields are filled in before handing off to Engineering, thus eliminating steps 4-7.

The new process now looks like:

1. Sales finishes signing a contract with Customer
2. Sales goes through runbook, verifies no issues, and notifies Engineering of the new registration
3. Engineering copies over commands and runs through them
4. Engineering completes onboarding and notifies Sales
5. Sales notifies customer

*What about a one-off process, like a report?:* I'd argue that documenting steps as you go still has its benefits. It communicates to others what you did (catch issues + education) and allows reuse if it's not a one-off after all.

*Why would I do this instead of scripting?:* Sometimes you're under a very tight deadline, and writing a script has additional (often forgotten) time costs. For example, authoring tax (testing, usage documentation) and maintenance tax (e.g. schema changes).

## Scripting
The next improvement is scripting, i.e. creating a CLI utility to automate what's being done in the runbook.

This has a much steeper time investment than a runbook, but it's also the first step to abstracting Engineering from an operational task (i.e. if core written modularly, then can easily repurpose code).

Some additional benefits are: We can be more confident in conditional logic, accept configuration parameters, and add testing (if desired).

The new process now looks like:

1. Sales finishes signing a contract with Customer
2. Sales goes through runbook, verifies no issues, and notifies Engineering of the new registration
3. Engineering runs the account creation script
4. Engineering notifies Sales
5. Sales notifies customer

## Internal tool
An internal tool is an employee-only site to look up internal data as well as perform common actions. Examples include:

[Rails Admin](https://github.com/railsadminteam/rails_admin)

![Screenshot of Rails Admin](/public/images/articles/startup-time-investing/rails-admin.webp)

[Django Admin](https://docs.djangoproject.com/en/stable/ref/contrib/admin/)

![Screenshot of Django Admin](/public/images/articles/startup-time-investing/django-admin.png)

[Retool](https://retool.com/)

![Screenshot of Retool](/public/images/articles/startup-time-investing/retool.png)

> I have mixed feelings about Retool. While it's super powerful, allowing interfacing with a DB directly for writes is risky in that it can allow business logic drift. This is why I prefer admin panels as part of codebases, to minimize implementation time (e.g. no API endpoint to build) and minimize drift.

While it's possible for a startup to get by without one, it's another fundamental investment that pays massive dividends by removing Engineering as a bottleneck.

The next step after a script is to make it an action in the internal tool for Sales to use.

The new process now looks like:

1. Sales finishes signing a contract with Customer
2. Sales navigates to internal tool and onboard the custom
3. Sales notifies customer

*What do you do for similar yet different complex reports?:* This is another form of internal tool, known as Business Intelligence. I've seen this take the form of SQL queries (e.g. [Redash][], Mode) as well as higher-level abstractions (e.g. Metabase).

[Redash]: https://redash.io/
[Mode]: https://mode.com/
[Metabase]: https://www.metabase.com/

## Self-serve
1. Customer contract signing triggers a webhook that Engineering set up
2. The webhook creates an account and sends an invite link to the Customer to self-serve onboard themselves

## No implementation
What would this even look like? Just cutting scope?

YAGNI definitely

## Skipping steps

## When to invest in the next step

## More examples
Real world Underdog.io example

Generating reports

Server setup (learned this one the hard way)

TODO: Auxilary relevant: When to test vs not, prob its own article tbh...


----

- Or let's go to something even
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

---

Further realization: Prioritization looks different at every company
due to how we communicate and orient

TODO: Google Forms survey:
- Did you enjoy the article?
- Would you like to hear about future articles? If so, how?
- Would you like us to let you know if we start offering that? If so, what's your email?
