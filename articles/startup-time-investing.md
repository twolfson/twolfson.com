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

I like to reframe the investment as a mode of transportation. i.e. If we invest the time and/or money into a bike/car/rocketship/etc for this task, is it worth it?

![Same bar graph as above but with pedestrian and car emojis on it](/public/images/articles/startup-time-investing/time-comparison-with-modes.svg)

To reiterate, these investments are usually independent from each other, so a rocketship for generating reports is unlikely reusable for setting up a server.

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
The next step is to abstract Sales from the process by automatically detecting when the contract is signed.

This could be a push-based system (e.g. receive a webhook), a pull-based system (e.g. on a cron query for status change), or something bespoke to the relevant integration.

The new process now looks like:

1. Customer contract signing triggers a webhook that Engineering set up
2. The webhook creates an account and sends an invite link to the Customer to self-serve onboard themselves

## No implementation
One option as well is to consider if the process is even needed. Onboarding is obviously needed, but what about a one-off report or a feature that's going away soon? By [building exactly what you need][], you save both the time invested as well as time spent doing the action.

[building exactly waht you need]: https://twolfson.com/2021-06-24-lessons-of-a-startup-engineer#build-exactly-what-you-need

## Jumping between levels
In each of these levels above, it seems very linear in order (i.e. Write a runbook THEN port to a script THEN ...). However, that would be rather wasteful of time if you just need self-serve immediately for the best experience.

In your considerations, it's best to factor in the costs and payoffs for each of these levels.

## When to invest in the next step
Figuring out time costs for each of these levels depends on:

- Your infrastructure
- Your and your coworker's experience with this system
- Other heuristics specific to your company
- Availabilities in your priorities (i.e. by choosing to do this, you're choosing to not do something else)
- Is there a hard deadline on this task? Would failing to finish on time jeopardize something?

Once you've sorted out the various costs, then you can compare to the value gained:

- How frequently you think this is going to be run?
- How much of a burden is it to other teams?
- How does it affect the user experience? (e.g. would automating decrease churn or increase conversions?)
- If you invest all this time, and the startup pivots (usually comes out of nowhere), is there still reuse after this?
  - For pivot timing, I usually try to predict 6 months into the future. Anything beyond that is usually impossible to guess at

One heuristic I usually lean into is "pain tolerance". If it starts to become painful to do on a regular basis, then I set aside time to automate further. One coworker phrases this as "[do it until it hurts][]", another common phrase is "[do things that don't scale][]".

[do it until it hurts]: https://islandinthenet.com/manual-until-it-hurts/
[do things that don't scale]: http://paulgraham.com/ds.html

## Time estimation
While I'm not going to dive into better time estimation techniques (short version: walk through code + think out what needs to be done), it's probably valuable to have some context on reasonable expectations.

Here's estimates I'd give for a task that takes 30 min to 1 hour (including 15 min context switching):

- Running commands by hand with a runbook: 30 min to 1 hour (no additional time for copy/pasting to runbook as I go)
- Writing a script: 2-4 hours (1 hour for commands + 1 hour for CLI testing + 2 hours buffer for issues that arise)
- Internal tool: 3-5 hours (1 hours for command + 1 hour for integrating into tool + 1 hour for testing + 2 hours for buffer)
- Self-serve: 6-10 hours (1 hour for command + 1 hour for integrating into endpoint + 2 hours for building UI + 2 hours for integrating with webhook + 4 hours for buffer)
  - Note: This is also creating UI for the end-user, so there's likely an iteration step you should have with coworkers for a consistent user experience
- No implementation: 0 minutes since nothing to be built 🎉

## Real-world examples
Real world Underdog.io example

Generating reports

Server setup (learned this one the hard way)

TODO: Auxilary relevant: When to test vs not, prob its own article tbh...

TODO: Link to Lessons of Startup Engineer

Deployments


----

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

TODO: Time to make the donuts meme

There's a few ways we can speed up a given task:

Not mentioned:
- Specialization
- Delegation

TODO: Google Forms survey:
- Did you enjoy the article?
- Would you like to hear about future articles? If so, how?
- Would you like us to let you know if we start offering that? If so, what's your email?
