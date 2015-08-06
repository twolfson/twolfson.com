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
git rebase master -i

# Push our updated PR
git push origin feature-1b --force
```

Alright, now that was 2 PR's. Imagine doing that workflow for a stack of 5 PR's. We are going to make some mistakes...

# Solution
To solve this problem, we are going to introduce the concept of historical branches and squashed branches. While walking through this, keep in mind that `git` is already good at dealing with merge conflicts in non-squashing workflows. This workflow is meant to embrace that.

First, let's give a historical/squashed workflow example. We will create and work on the `feature` branch (historical branch). Then, squash our work into the `feature.squashed` branch (squashed branch) for our PR:

```bash
# Work on and build our feature branch
git checkout -b feature
touch file
git add file
git commit -m "Work"
touch file2
git add file2
git commit -m "More work"

# When we are ready to open our PR
# DEV: We use -B to overwrite any past squashed branches
git checkout -B feature.squashed
git rebase -i master
# Squash all our commits

# Push our squashed branch and open PR for `feature.squashed` to `master`
git push origin feature.squashed
```

Here's a visualization of our `git` history:

```
        o feature.squashed (a22222)
       /
      /---o---o feature (aaaaaa)
     /
o---o- master (ffffff)
```

When we land this PR, it will look like:

```
      /---o---o feature (aaaaaa)
     /
o---o---o- master, feature.squashed (a22222)
```

If we have to update our PR, we don't update the squashed branch, but instead update the historical branch:

```bash
# Make an edit on our
git checkout
```

// TODO: Document cleaning up sqwished and base branches






-------------

// TODO: Maybe document `git-sqwish` at the very end

After using `git-rebase` a handful of times, I got fed up with it due to repeating merge conflicts and wrote [git-sqwish][].

[git-sqwish]: https://github.com/twolfson/git-sqwish

For the purposes of this discussion, you can think of `git-sqwish` as 2 commands combined in 1:

```bash
# Checkout current branch with `.sqwished` suffix (e.g. `feature-1a` -> `feature-1a.sqwished`)
git checkout -B "$(git symbolic-ref --short HEAD).sqwished"

# Squash our commits (replaces interactive selection part with a `git commit` prompt)
git rebase -i master  # Or whatever base branch we had
```

When we combine this into a

// TODO: Don't forget to explain how git history works when combining base and normal

// TODO: Don't forget to mention how we can sanely perform diffs on 2nd `.base` and 1st `.sqwished`

// TODO: Don't forget to mention how to handle replacing `.base` branches

// TODO: Don't forget to explain how git history works when collapsing base/sqwished

// TODO: Define `git-branch2` or something. Maybe `head-branch` or `this-branch` or `current-branch`

Things not to do:

- Merge in `master` on the non-first PR. This will lead `git` to claim that we are introducing all of `master` changes on our new PR
    - Why: When we sqwish in a non-first PR, we are sqwishing against a `.base` branch. This branch has no information about the changes in `master`. As a result, the diff between our `master`-merged branch and the `master`-unmerged commit, will include all of `master` changes in our sqwish commit.
-
