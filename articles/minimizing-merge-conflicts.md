{
  "title": "Minimizing merge conflicts",
  "author": "Todd Wolfson",
  "date": "2015-08-06T01:31:17-0500",
  "keywords": "merge, conflict, git, rebase, historical",
  "summary": "A `git` workflow that minimizes merge conflicts"
}

// TODO: We might want to promote second paragraph to be first line hook

It is always a good idea to keep pull requests (PRs) focused to a single feature and in a digestible size (i.e. up to 150 lines of code). This serves a few purposes:

- Keeps features separate, allowing us to identify better abstractions
- Allows our fellow maintainers to review a pull request in a timely manner
- Allows us to review our own code changes without skipping over something important

But what happens when we have the common practice of squashing our PRs and need to implement dependant features (e.g. abstract a utility function, use utility function in new location). In my experience, we get into a merge conflict nightmare (especially when there is a stack of 5 dependant PRs and the 1st PR requires a change).

Typical workflows like `git rebase`, `git commit --amend`, and `git merge --squash` fall apart quite quickly whenever one of the lower PRs needs to change.

For the purpose of our examples, let's use an example where `feature-1` is being implemented across multiple PRs

```
        o feature-1b
       /
      o feature-1a
     /
o---o---o master
```
