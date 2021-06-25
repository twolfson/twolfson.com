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

Scenario ([Underdog.io][]): You launched your startup by using a [Google Forms][] to intake customers and manage everything via email. Once a month, 2 users try to sign-up concurrently which leads to an error.
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

To reiterate, this decision was founded in **branding** not **technical perfection**.

> For those curious why one might use Google Forms instead of a database from the get-go: Without customers and getting product feedback, you can't guarantee that people will want what you're building.

# Build exactly what you need
"Build exactly what you need and nothing more" is how I frame this in my head (also sometimes [YAGNI][] or [JIT][] design).

[YAGNI]: https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it
[JIT]: https://en.wikipedia.org/wiki/Just-in-time_compilation

When we try to predict what we'll need for the future, we almost always get it wrong. And thus, we do a lot of extra work (both building and maintenance) for little gain.

TODO: Really drive home point of how many ways this can rear its head:
- Excessive services
- Optimizing for different model relationships
- Prob more points, though can't quite think of them...

Example ([SilviaTerra][]): Property one-to-many

[SilviaTerra]:

Scenario ([Underdog.io][]): You're adding keywords functionality to an existing model (e.g. candidate). What do you do?

a. Refuse to build the feature - There's not enough value we'll get from building it
<br/>
b. Use a JSON column - This is an experimental feature and the cost of formalizing later is low enough
<br/>
c. Use a many-to-many table - This is a long-lived feature (e.g. been stuffing keywords in descriptions) and it'll pay dividends in the future
<br/>
d. Try out Elasticsearch - It's built for searching, right? Let's try that!
<br/>
e. Something else

Worth noting: Build vs buy. TODO Link me

> Side note: Don't use Elasticsearch for this. First off, it's the wrong tool (append only) which you might not know, yet waste 2 days to learn.
>
> More importantly though,
