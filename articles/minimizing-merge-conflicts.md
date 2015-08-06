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
        o feature-1b (bbbbbb)
       /
      o feature-1a (aaaaaa)
     /
o---o- master (ffffff)
```

and in the end, we want:

```
              feature-1a (aaaaaa)
             /
o---o---o---o---o master, feature-1b (bbbbbb)
```

But during code review, we receive a request for adding a comment for clarity. The new goal for our PRs

```
        o feature-1b (b22222) -- SHA changes because the previous commit SHA changed
       /
      o feature-1a (a22222)
     /
o---o- master (ffffff)
```

// TODO: Maybe create example gist

Most ways of doing this lead to hard to debug merge conflicts. Here is one amateur example:

```bash
# Navigate to our 1st PR's branch
git checkout feature-1a

# Edit our file
pico file.txt

# Update our PR commit
git add file.txt
git commit --amend --no-edit
# New commit is now a22222

# Push our updated PR
git push origin feature-1a --force

# Navigate to our 2nd PR's branch
git checkout feature-1b

# Merge in our past work
git merge feature-1a
# Pro-tip: Use `git merge -` to merge past branch

# Sort out our merge conflict
git mergetool -y
# Need to update every file that was edited in `bbbbbb`
# Additionally, hard to know whether we kept all of our intended changes

# Commit our edits
git commit --no-edit

# Squash our commits
git rebase -i

# Push our updated PR
git push origin feature-1b --force
```

Alright, now that was 2 PR's. Imagine doing that workflow for a stack of 5 PR's. We are going to make some mistakes...


