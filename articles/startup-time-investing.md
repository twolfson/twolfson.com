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
An operational task is a task that emerges from running a business (e.g. generating reports, onboarding customers, setting up a server, [making donuts][]).

[making donuts]: https://www.youtube.com/watch?v=XyZtMfMWONI

Each of these tasks has a time cost associated with it (time to do the task) as well as the amount you've invested to make it faster.

![Bar graph of time spent vs time invested](/public/images/articles/startup-time-investing/time-comparison.svg)

I like to reframe the investment as a mode of transportation. i.e. If we invest the time and/or money into a bike/car/rocketship/etc for this task, is it worth it?

![Same bar graph as above but with pedestrian and car emojis on it](/public/images/articles/startup-time-investing/time-comparison-with-modes.svg)

To reiterate, these investments are usually independent from each other, so a rocketship for generating reports is unlikely reusable for setting up a server.

> Aside: One of my [engineering values][] is velocity (internal and external perception), so it makes sense that I lean into this analogy.

[engineering values]: https://vimeo.com/230142234

# Pain tolerance
Let's zoom in on an example recurring task. We're going to start with a contrived example but will have real-world examples at the article end.

At Company X, they're a sales-oriented company and manually perform account creation to onboard a new customer.

On the side with no time invested, we have the "slow and painful" version:

1. Sales finishes signing a contract with Customer
2. Sales notifies Engineering of the new registration
3. Engineering has no documentation, reads through code, figures out the commands, and thankfully nothing goes wrong
4. Partway through Engineering realize they're missing a critical field (e.g. [database color](https://dilbert.com/strip/1995-11-17)) and notifies Sales
5. Sales reaches out to the Customer
6. Customer replies to Sales
7. Sales notifies Engineering
8. Engineering completes onboarding and notifies Sales
9. Sales notifies Customer

On the side with maximum time invested, onboarding is "fast and easy":

1. Customer signs contract, a webhook is triggered (set up by Engineering)
2. The webhook creates an account and sends an invite link to the Customer to self-serve onboard themselves

If you're an empath with low pain tolerance for monotony, then the "fast and easy" version should feel a lot better from the perspectives of yourself, the rest of your team, and the customer.

If you don't feel this, then this article probably isn't for you =/

# Incremental improvements
So why did that first one feel so bad, what can we can we improve, and when can we find time to improve it?

Why it felt so bad: It was monotonous (sometimes "hurry up and wait", sometimes we've done it 100x before) as well as stressful (e.g. easy to typo a command).

As for the other 2 questions, let's think about incremental improvements to get to "fast and easy", as well as how much time they'll take.

## Runbooks and note taking
The biggest impact low hanging fruit is that we haven't yet [invested in the fundamentals][] around documentation.

[invested in the fundamentals]: https://twolfson.com/2021-06-24-lessons-of-a-startup-engineer#invest-in-fundamentals

In this scenario, I would take notes during the process, then clean up the notes afterwards for consumption by others. This form of documentation is called a runbook or a workflow.

By doing this, we now have commands to copy/paste, thus stress less and spend less time about getting code right next time.

Additionally, we've established a convention for the rest of the company to adopt. e.g. Sales + Engineering can create a runbook to verify all fields are filled in before handing off to Engineering, thus eliminating steps 4-7.

The new process now looks like:

1. Sales finishes signing a contract with Customer
2. Sales goes through the Sales Onboarding runbook, verifies no issues, and notifies Engineering of the new registration
3. Engineering steps through the Engineering Onboarding runbook and copies over commands
4. Engineering completes onboarding and notifies Sales
5. Sales notifies customer

*Q: What about a one-off process, like a report?*
<br/>
A: I'd argue that documenting steps as you go still has its benefits. It communicates to others what you did (catch issues + education) and allows reuse if it's not a one-off after all.

*Q: Why would I do this instead of scripting?*
<br/>
A: Sometimes you're under a very tight deadline, and writing a script has additional (often forgotten) time costs. For example, authoring tax (testing, usage documentation) and maintenance tax (e.g. schema changes).

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
![Screenshot of Rails Admin](/public/images/articles/startup-time-investing/rails-admin.png)

[Django Admin](https://docs.djangoproject.com/en/stable/ref/contrib/admin/)
![Screenshot of Django Admin](/public/images/articles/startup-time-investing/django-admin.webp)

[Retool](https://retool.com/)
![Screenshot of Retool](/public/images/articles/startup-time-investing/retool.png)

> I have mixed feelings about Retool. While it's powerful, writing directly to a DB bypasses business logic. If you use it, interface with an internal API.

While it's possible for a startup to get by without an internal tool, it's another [fundamental investment][] that pays massive dividends by removing Engineering as a bottleneck.

[fundamental investment]: https://twolfson.com/2021-06-24-lessons-of-a-startup-engineer#invest-in-fundamentals

For our incremental improvement lens, the next step would be to mold our script into an action in the internal tool.

The new process now looks like:

1. Sales finishes signing a contract with Customer
2. Sales navigates to internal tool and onboard the customer
3. Sales notifies customer

*Q: What about similar yet different nuanced reports?*
<br/>
A: This is another form of internal tool, known as Business Intelligence (BI). I've seen this take the form of SQL queries (e.g. [Redash][], [Mode][]) as well as higher-level abstractions (e.g. [Metabase][]).

[Redash]: https://redash.io/
[Mode]: https://mode.com/
[Metabase]: https://www.metabase.com/

## Self-serve
The next step is to remove Sales from the process by integrating into when a contract is signed.

This could be a push-based system (e.g. receive a webhook), a pull-based system (e.g. on a cron, query for status change), or something bespoke to the relevant integration.

The new process now looks like:

1. Customer signs contract, a webhook is triggered (set up by Engineering)
2. The webhook creates an account and sends an invite link to the Customer to self-serve onboard themselves

## No implementation
One additional option to consider is if the process is needed.

Onboarding is obviously needed, but what about a one-off report or a feature that's going away soon?

By [building exactly what you need][], you save both the time invested as well as time spent doing the action.

[building exactly what you need]: https://twolfson.com/2021-06-24-lessons-of-a-startup-engineer#build-exactly-what-you-need

## Jumping between levels
In each of these increments above, it seems very linear in order (i.e. Write a runbook **then** port to a script **then** ...). However, that would be rather wasteful of time if you just need self-serve immediately for the best experience.

In your considerations, factor in the costs and payoffs for each of these levels from where you're at currently, as well as the effort again to move to the ones after that.

## When to invest in the next step
Like many business decisions, this is a cost vs value decision.

On the cost side, each level depends on:

- Your infrastructure (e.g. does internal tool exist yet?)
- You and your coworkers' experience adding to this system
- Time availability to do this upgrade (i.e. by choosing to do this, you're choosing to not do something else)
- Is there a hard deadline on this task? Would failing to finish on time jeopardize something?
- Other heuristics specific to your company

On the value side, we consider:

- How frequently do you think this is going to be run?
- How much of a burden is running the task to other teams? (e.g. is there some common associated support ticket?)
- How does it affect the user experience? (e.g. would automating decrease churn or increase conversions?)
- If you invest all this time, and the startup pivots (these usually come out of nowhere), is there still reuse after this?
  - For pivot timing, I usually try to predict 6 months into the future. Anything beyond that is usually impossible to guess

One heuristic I usually lean into is "pain tolerance". If it starts to become painful to do on a regular basis, then I set aside time to automate further. One coworker phrases this as "[do it until it hurts][]", another common phrase is "[do things that don't scale][]".

[do it until it hurts]: https://islandinthenet.com/manual-until-it-hurts/
[do things that don't scale]: http://paulgraham.com/ds.html

## Time estimation
While this article isn't going to dive into better time estimation techniques (short version: walk through code + think out what needs to be done), it's probably valuable to have some context on reasonable expectations.

Here's estimates I'd give for a task that takes 30 min to 1 hour (including 15 min context switching):

- Running commands by hand with a runbook: 30 min to 1 hour
  - No additional time for copy/pasting to runbook as I go
- Writing a script: 2-4 hours
  - 1 hour for commands + 1 hour for CLI testing + 2 hours buffer for issues that arise
- Internal tool: 3-5 hours
  - 1 hours for command + 1 hour for integrating into tool + 1 hour for testing + 2 hours for buffer
- Self-serve: 6-10 hours
  - 1 hour for command + 1 hour for integrating into endpoint + 2 hours for building UI + 2 hours for integrating with webhook + 4 hours for buffer
  - Note: This also creates UI for the end-user, so there's likely a conversation you should have with coworkers around UX
- No implementation: 0 minutes since there's nothing to build 🎉

# Real-world examples
## Weekly batches
At [Underdog.io][], a curated job seeker <-> company marketplace, we'd send out weekly emails with a new candidate batch to companies.

The initial setup was:

- All data entry was into a Google Sheet (explanation in "[Lessons of a startup engineer][]")
- Review was done with an internal tool, but data was saved back to Google Sheet as database
- Cofounders would copy/paste new candidates to one-off spreadsheets
- Manually filter out candidates from specific companies (e.g. opt-out of sending to current employer)
- Send off email to each company
- For newly onboarded companies, we'd send a one-off batch of all candidates who were recently active

As you can imagine, this was fantastic for proving it was a viable business without investing too much time into building something fuller.

Unfortunately, it only works for so long until you start to run out of time (i.e. founders were taking full Sundays to perform this task).

We had some major concerns around the current process:

- It wasn't going to scale as we added more customers
- It was becoming increasingly more risky to prevent sending candidates to companies they opted out from

So, improvements were high value and thus high priority:

- First, we automated the email generation into our internal tool with a person-in-the-loop review step
  - Note: Arguably this is a jump from an unwritten runbook to internal tool
- Next, we added safeguards like string distances to further derisk any accidental opt-out misses
- Lastly, we moved all the Google Sheets transparency to the internal tool, then migrated to PostgreSQL
  - This maintained value and eliminated the risk of unintentional data modification/loss

We stopped here by not fully automating the sending of batches, because we still wanted the human touch in our emails as well as building trust in the automated system.

[Lessons of a startup engineer]: https://twolfson.com/2021-06-24-lessons-of-a-startup-engineer#every-decision-is-a-business-decision

[Underdog.io]: https://underdog.io/

## Server setup
This is an example of when automation goes too far. i.e. Server setup for low-traffic early stage startup should just be logged as a runbook and not automated any further.

However, my naive self hadn't learned these lessons yet and did:

- [Full-on automation][] for standing up twolfson.com (this site) via [Chef][]
- Reused that same setup for [Find Work][]
- At [Standard Cyborg][], we wanted HIPAA compliance so we migrated to AWS but also built a very robust [Terraform][] setup

As one might imagine, these were fantastic to build and understand. But when you come back to the setup months later to adjust things (e.g. upgrade Node.js), it has a massive maintenance tax from being out of mind and relearning it adds little business value.

Thus, a runbook would have been significantly easier to generate as well as maintain.

[Full-on automation]: https://github.com/twolfson/twolfson.com-scripts
[Chef]: https://www.chef.io/
[Find Work]: https://www.linkedin.com/company/17971168/
[Standard Cyborg]: https://standardcyborg.com/
[Terraform]: https://www.terraform.io/

## Scan processing
TODO: Employee churn

## Additional short-list
Additional common tasks that I have opinions about:

- Deployments, these should be occuring regularly so scripting at a minimum is critical
  - It gets fuzzy with doing Continuous Delivery (CD), since you also need a robust migration/rollback system
- Database scrubbing and pruning, any level of automation makes sense here. Likely depends on frequency and monotony

----

TODO: Link to Lessons of Startup Engineer

Not mentioned:
- Specialization
- Delegation

TODO: Google Forms survey:
- Did you enjoy the article?
- Would you like to hear about future articles? If so, how?
- Would you like us to let you know if we start offering that? If so, what's your email?
