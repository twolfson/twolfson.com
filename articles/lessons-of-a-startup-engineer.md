{
  "title": "Lessons of a startup engineer",
  "author": "Todd Wolfson",
  "date": "2021-06-24T18:46:37-0500",
  "keywords": "startups, engineering, experience, lessons",
  "summary": "Lessons from being a 3x first engineer and even more startups",
  ".relatedArticles": []
}

After recently returning to work, it's become clear that knowledge I've picked up over the years, wasn't knowledge shared by my similarly aged but newly startup peers. For reference, here's my [LinkedIn profile][LinkedIn].

[LinkedIn]: https://www.linkedin.com/in/toddwolfson/

As a result, I'd like to capture all the lessons I've been reminded to share.

# Every decision is a business decision
At a startup, any decision 1 person makes has a significantly larger impact due to the size of the company.

e.g. 1 person at a 3 person startup is 1/3 the company, whereas at a 10,000 person company it's 1/10,000 (handwaving over hierarchy details).

In practice, it's more likely that a decision might take a person's out of forward velocity, which impacts team and company velocity.

Scenario (Underdog.io): You launched your startup by using a [Google Forms][] to intake customers and manage everything via email. Once a month, 2 users try to sign-up concurrently which leads to an error.
<br/>
What do you do?

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

To reiterate, this decision was founded in **branding** not **technical perfection**.

> For those curious why one might use Google Forms instead of a database from the get-go: Without customers and getting product feedback, you can't guarantee that people will want what you're building.

# Build exactly what you need
"Build exactly what you need and nothing more" is how I frame this in my head (also sometimes [YAGNI][] or [JIT][] design).

[YAGNI]: https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it
[JIT]: https://en.wikipedia.org/wiki/Just-in-time_compilation

Scenario: You're adding keywords functionality to an existing item

Worth noting: Build vs buy. TODO Link me
