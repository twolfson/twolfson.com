{
  "title": "Parallel visual testing",
  "author": "Todd Wolfson",
  "date": "2017-01-29T17:57:49-0600",
  "keywords": "visual, testing, perceptual, parallel",
  "summary": "Comparison of parallelization techniques for visual testing"
}

In my current project, I've been using visual tests. At some point, running tests in series no longer became feasible (e.g. currently 4 minute run time). As a result, I moved to parallel testing (down to 40 seconds) but this was with mock data so it was trivial.

When I started to move from mock data to database data, this became less trivial. We came up with following requirements:

- Tests should be able to run in parallel to prevent long test runs
- Data should be consistent between test runs (e.g. always see items A, B, C for `/foo`)

We came up with the following solutions:

# Development endpoints
Create a one-off development endpoint for each test scenario (e.g. `/foo` would have a `/_dev/foo` which loads mock data)

> This has been what I've used for a long time. It's proven itself well but it doesn't scale well =(

**Pros:**

- Easy to add new endpoints
- Can debug tests easily

**Cons:**

- High maintenance cost (e.g. need to write mock endpoint for every new endpoint)
- Easily to get out of sync (e.g. render data might not align to normal endpoint)

# Multiple databases
With server-side testing, tests can be parallelized by using multiple databases (e.g. `_test0`, ..., `_test3`). We could reuse the same technique with our visual tests. This does lead to more problems though:

- How does a browser know which server/database to use?
    - Solve via environment variable and URL resolving function
- How do we set/reset database fixtues?
    - Solve via a magic endpoint -- must be restricted to not be in `production`

**Pros:**

- As accurate as production
- Can debug tests easily

**Cons:**

- Slow due to updating fixtures in database
- Tedious to maintain

# Test-generated HTML
During server-side testing, we could record the generated HTML to files. Then, we could host those files statically and run visual tests against them.

**Pros:**

- Fast and requires maintaining only 1 test suite

**Cons:**

- Potentially lose testing accuracy due to some state only being preserved in JS
- Requires main test suite to be run to generate new HTML so we have a new series problem (i.e. tests could take even longer)
- Cannot easily iterate on tests as its not a live server

# Mock mode
Create a development-only endpoint which sets a flag on the session to load mock data instead of database data (e.g. `/_dev/setup`). In each normal endpoint, use a conditional to load data from fixtures instead of database

**Pros:**

- Easy to maintain (i.e. write loader once, controller logic stays same, can reuse existing test fixtures)
- Can debug tests easily

**Cons:**

- Requires diligence during initial setup (e.g. make sure that mock data can never be used in production)

# Result
We chose "Mock mode" and have been using it for the past month. It's been easy to debug and flexible (e.g. can switch between fixtures via query parameters).

We have been using Gemini for testing which isn't the friendliest for customization but we've made it work. Here's a sample Gemini test:

```
```
