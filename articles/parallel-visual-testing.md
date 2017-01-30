{
  "title": "Parallel visual testing",
  "author": "Todd Wolfson",
  "date": "2017-01-29T17:57:49-0600",
  "keywords": "visual, testing, perceptual, parallel",
  "summary": "Comparison of parallelization techniques for visual testing"
}

In my current project, I've been using visual tests from the beginning. At some point, running the tests in series no longer became feasible (e.g. currently 4 minute run time). As a result, I moved to parallel testing (down to 40 seconds) but this was with mock data so it was trivial.

When I started to move from mock data to database data, this became less trivial. We came up with following requirements:

- Tests should be able to run in parallel (to prevent long delays during testing)
    - This essentially means we either need no database or multiple databases to allow for multiple users/data states
    - Multiple databases starts to go down a rabbit hole of needing to reset database data which will take even longer
- Visual data should be consistent between test runs
    - This essentially means we need to use fixtured data

We came up with the following solutions:

# Test-generated HTML
We could

# Mock mode
