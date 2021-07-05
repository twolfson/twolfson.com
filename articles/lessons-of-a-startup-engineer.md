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
- Quick and easy deploys
- Error monitoring
- Linting
- Basic testing
