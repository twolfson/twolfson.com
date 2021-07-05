{
  "title": "Lessons of a startup engineer",
  "author": "Todd Wolfson",
  "date": "2021-06-24T18:46:37-0500",
  "keywords": "startups, engineering, experience, lessons",
  "summary": "Lessons from being a 3x first engineer and from even more startups"
}

After recently returning to work, it became clear that knowledge I've picked up over the years, wasn't knowledge shared by my similarly aged but newly startup peers. For reference, here's my [LinkedIn profile][LinkedIn].

[LinkedIn]: https://www.linkedin.com/in/toddwolfson/

As a result, I'd like to document all the experienced lessons I've been reminded of.

# Every decision is a business decision
At a startup, any decision 1 person makes has a significantly larger impact due to the size of the company.

e.g. 1 person at a 3 person startup is 1/3 the company, whereas at a 10,000 person company it's 1/10,000 (handwaving over hierarchy details).

In practice, this most frequently cascades from a person's forward velocity being interrupted, which then impacts team and company velocity.

> Terminology: Team implies internal grouping/perspective, company implies external

Scenario ([Underdog.io][]): You launched your startup by using a [Google Forms][] to intake customers and manage everything via email. Once a month, 2 users try to sign-up concurrently which leads to an error page.
<br/>
What do you do?

[Underdog.io]: https://underdog.io/

a. Focus time elsewhere - People will try again and it's infrequent enough
<br/>
b. Revisit when it's once a day - It's painful and upsetting but we can tolerate it for a little longer
<br/>
c. Unacceptable - Move to a formal database like [PostgreSQL][]
<br/>
d. Something else

[Google Forms]: https://www.google.com/forms/about/
[PostgreSQL]: https://www.postgresql.org/

What we did: We weighed out the options (e.g. time/effort vs value) and decided to go with (c). We wanted a stellar experience for our users and treating them poorly wasn't inline with that.

To reiterate, this decision was founded in **user experience** not **technical perfection**.

> For those curious why one might use Google Forms instead of a database from the get-go: Without customers and getting product feedback, we can't guarantee that people will want what we're building.

# Build exactly what you need
"Build exactly what you need and nothing more" is how I frame this in my head (also sometimes [YAGNI][] or [JIT][]).

[YAGNI]: https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it
[JIT]: https://en.wikipedia.org/wiki/Just-in-time_compilation

When we try to predict what we'll need for the future, we almost always get it wrong. And thus we do a lot of extra work (both building and maintenance) for little gain.

This can come up in many ways:
- Excessive services (e.g. API + web app + admin tools -- when 1 monolith would have sufficed)
  - High maintenance costs for: Concurrent feature development and deployment, reading/writing additional API calls
- Anticipating a feature that's not being built yet
  - Added costs: Thinking, building, and maintaining new logic edge cases which aren't even being used
  - Following this rule doesn't mean writing yourself into a corner, building with openness in mind should always be followed
  - Exception to the rule: Can be ignored if feature is next in the queue
- Anticipating data model correctness
  - Similar to anticipating a feature
  - Best handled by experimenting with UX prototype first to verify it feels right (complex state in [Cynefin framework][])
- Many more varieties

[Cynefin framework]: https://en.wikipedia.org/wiki/Cynefin_framework

> Stronger rant on anticipating features: Startup goals and directions change swiftly.
>
> In 1 day, you might shift your entire target market which means the product does as well. Or you see that nobody is using feature X so progressive improvements to that are no longer needed.
>
> In both these cases and more, shipping frequently with small well-contained PRs (features) that can be easily added/removed are critical for maintaining high business velocity and a tight feedback loop.

Scenario ([Underdog.io][]): You're building the data model to save resume URLs for candidates. We might want to have resume history in the future.
<br/>
What do you do?

a. Don't build historical support yet - We don't need it and it will significantly complicate logic
<br/>
b. Build historical support now - We feel confident enough that this will be a feature we support
<br/>
c. Build audit table for future backfill - A little more work but can restore historical info
<br/>
d. Something else

What we did: (a) Refuse to build historical support yet. Among the massive backlog of other work to be done, it was at least 6 months away before being a practical need. This is a relatively clear-cut example, others may be a lot more muddy.

# Invest in fundamentals
The early architecture and service(s) your company settles on will likely be with you for a while (e.g. at least 2 years).

As a result, it makes sense to establish fundamentals that help team happiness, confidence, and velocity.

My short list is:
- Quick and easy deploys - One click or prebuilt script with easy revert plan (something will go wrong eventually)
- Fast deploys - Ship a feature and be able to check it while still in your headspaces
- Error monitoring (e.g. Sentry) - Know when something broke in production, don't rely on customers telling you (bad experience for them too)
- Linting and CI - Catch errors early (e.g. typo'd variables) and help keep code simple and consistent
- Basic testing - Nothing complex needed but something so you can dive into TDD when practical

When all these efforts are summed together, the seconds here and there accrue into many hours saved when done early in the 2+ year journey as well as happier teams.

Example ([Standard Cyborg][]): When I joined, the deployment process was not standardized, slow, and easy to miss a step.

- Internal library: Required manual build + commit + push
- Web app: Build internal library, commit, push, and deploy to Heroku via `git push`
- Lambda: Dependent on developer computer's existing dependencies and running multiple commands like installing and zipping by hand. Also dependent on internal library

After formalizing and standardizing these, the process was smoothed out and future engineers were able to deploy with ease.

[Standard Cyborg]: https://standardcyborg.com/

# Stick to boring and simple
Being clever or using shiny technology is often a good way to waste time for our future selves. This has been well laid out by [@mcfunley][choose-boring].

[choose-boring]: https://mcfunley.com/choose-boring-technology

Examples I've seen time and time again:

- Using a non-SQL database (e.g. MongoDB) - Eventually run into querying, performance, and/or integration issues
- Using a different language or framework to the existing stack - Now every existing and new engineer needs to learn this as well
- Using a new language or framework (e.g. 2 years since first commit) - Likely will run into performance issues, does 80% of what you need but won't find out until 3 months later, or the API will change on you
- Rewriting a service from scratch instead of progressively fixing the existing one - Takes a lot more time and little company value is actually gained

If you're starting outright, I'd highly recommend using:

- PostgreSQL - Has less footguns than MySQL plus better open source support
- Django or Rails - Has a lot more batteries included than DIY middleware combining in Flask, Express, or Sinatra
- Bootstrap - Well thought out design system with plenty of components
  - Only practical if your designs lean into Bootstrap patterns, not fight them
- That's it, nothing else is usually needed for a web app

Example ([Verbling][]): This was in React's early days. They were using all the shiny tools (e.g. React, GraphQL, MongoDB) and as a result, they had a lackluster ecosystem to support them (e.g. no admin tooling, running into MongoDB issues, no React server-side rendering).

It was probably great to use in the beginning but clearly it was reaching a breaking point without [any practical benefit to the company][every-decision].

[Verbling]: https://www.verbling.com/

[every-decision]: #every-decision-is-a-business-decision

# Do it right the first time
Also phrased as "fix it now or it will never get fixed".

As mentioned in [Build exactly what you need][], startup priorities can change within a day. The time you thought you had to formalize feature X is now gone and is unlikely to come back within the next 3 months.

Do it right the first time. Take the time to formalize the PR to stand the test of time. It doesn't need to be bullet proof but it shouldn't have any footguns in it either.

[Build exactly what you need]: #build-exactly-what-you-need

If there's not enough time to formalize it properly, then consider deferral by leveraging error monitoring and defensive programming to be aware of when it breaks (e.g. `assert` calls for unexpected values).

Example ([Standard Cyborg][]): I built a prototyped solution with `O(n^2)` runtime for some vertex properties. It worked great but we'd inevitably run into issues for larger meshes (more vertices, bigger `n`). As a result, we took the time to code up an `O(n)` solution before landing the PR.

The deferral solution would have been an `assert` or `Sentry.captureException` call for when the vertex count is too high.

# Resumable work
I've [written about resumeable work before][resumable-work]. The tl;dr version is:

If a reprioritization occurs and an effort is 50% complete, write out how to resume the effort and what's in progress.

It may be weeks or months until you (or someone else) can get back to it.

[resumable-work]: https://twolfson.com/2016-09-13-resumable-work

Example ([Find Work][]): I took 3 months away from working on the project. When I returned, my mind had lost all context. By writing documentation and planned out tasks, I was able to pick things up from where I left off.

[Find Work]: https://www.linkedin.com/company/17971168/

# Fix as you go
Some topics might be difficult to allocate full chunks of time for. As a result, I'll sometimes do a "run and gun" style of fixing things.

I start by documenting everything I see (either in a personal note or in a knowledge base). When I next have some downtime (e.g. asking for feedback on a feature), then I start taking on 1 of these tasks.

Sometimes this comes about as directly opening a PR for the feature.

Other times, it involves writing up a proof of concept (PoC), showing a demo to other engineers, and getting their support and consent.

Example ([SilviaTerra][]): We were using [Django REST Framework][DRF] but mostly as JSON request/responses, not actual REST resources. I wrote up a PoC, pitched it, and we progressively shrunk/simplified the codebase, endpoint by endpoint, over the course of 1 month.

[SilviaTerra]: https://silviaterra.com
[DRF]: https://www.django-rest-framework.org/
