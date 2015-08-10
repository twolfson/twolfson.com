{
  "title": "Minimizing merge conflicts",
  "author": "Todd Wolfson",
  "date": "2015-08-06T01:31:17-0500",
  "keywords": "merge, conflict, git, rebase, historical",
  "summary": "An guide to my `git` workflow which minimizes merge conflicts."
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
echo "hello" > file
git add file
git commit -m "Added hello file"
echo "world" > file2
git add file2
git commit -m "Added world file"

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
        +---o feature.squashed (a22222)
       /
      /---o---o feature (aaaaaa)
     /
o---o- master (ffffff)
```

When we land this PR, it will look like:

```
      +---o---o feature (aaaaaa)
     /
o---o---o- master, feature.squashed (a22222)
```

If we have to update our PR, we don't update the squashed branch, but instead update the historical branch:

```bash
# Make an edit on our historical branch
git checkout feature
echo "hello world" > file
git add file
git commit -m "Corrected file's content"

# Update our squashed branch (still using -B to override the branch)
git checkout -B feature.squashed
git rebase -i master
# Squash all our commits

# Force push our squashed branch which automatically updates the PR
git push origin feature.squashed --force
```

Now that we are established with the historical/squashed workflow, let's apply it to the first example:

```
        o feature-1b (bbbbbb)
       /
      o feature-1a (aaaaaa)
     /
o---o- master (ffffff)
```

For the purpose of dependent PRs, we are going to add one more notion known as a `base` branch. This is where the historical branch forked from it's dependent branch. For the example above, our structure will look like

```
                +---o feature-1b.squashed (b22222)
               /
              /---o---o feature-1b (bbbbbb)
             /
        +---o feature-1a.squashed, feature-1b.base (a22222)
       /
      /---o---o feature-1a (aaaaaa)
     /
o---o- master (ffffff)
```

To reiterate, the contents of `aaaaaa` and `a22222` are the same (similarly with `bbbbbb` and `b22222`).

// TODO: Add some commands to play with this example at home, maybe in a gist
// TODO: Do the same example thing for the very first example

Building the current `git` structure would look like:

```bash
# Build our feature-1a on a historical branch
git checkout -b feature-1a
echo "hello" > file
git add file
git commit -m "Added hello file"

// TODO: We should have 2 commits to make it a realistic squash

# Squash into our feature-1a squashed branch
git checkout -B feature-1a.squashed
git rebase -i master

# Open our first PR
git push origin feature-1a.squashed

# Mark our origin for feature-1b
git checkout -b feature-1b.base

# Build our feature-1b on a historical branch
git checkout -b feature-1b
echo "world" > file2
git add file2
git commit -m "Added world file"

// TODO: We should have 2 commits to make it a realistic squash

# Squash into our feature-1b squashed branch
#   but for this one, we base off of our feature-1b base
git checkout -B feature-1b.squashed
git rebase -i feature-1b.base

# Open our second PR
git push origin feature-1b.squashed
```

When we land our stack of PR's, it happens the same as a normal PR:

```bash
# Land our first PR
git checkout master
git merge feature-1a.squashed
git push origin master

# Land our second PR
git merge feature-1b.squashed
git push origin master
```

**Pro-tip:** We don't land `feature-1b.squashed` directly, as we should detect conflicting merges at the very first PR.

Now, let's handle the scenario of us needing to update our first PR. Our updated history should look like:

```
                +---o feature-1b.squashed (b44444)
               /
              /---o---o feature-1b (b33333)
             /
        +---o feature-1a.squashed, feature-1b.base (a44444)
       /
      /---o---o---o feature-1a (a33333)
     /
o---o- master (ffffff)
```

```bash
# Checkout our first historical branch
git checkout feature-1a
echo "hello world" > file
git add file
git commit -m "Corrected file's content"

# Update our squashed branch (still using -B to override the branch)
git checkout -B feature-1a.squashed
git rebase -i master

# Force push our squashed branch which automatically updates the PR
git push origin feature-1a.squashed --force

# Navigate to our base for the second historical branch and merge in our changes
git checkout feature-1b.base
git merge feature-1a.squashed
# Pro-tip: Use `git merge -` to merge past branch

# Verify there are no differences between our base commit and the squashed revision
# DEV: This is a nice step to debug between branches to verify there are no gotchas
git diff feature-1a.squashed

# Navigate to our second historical branch and merge in the changes to our second base
git checkout feature-1b
git merge feature-1b.base
# Pro-tip: Use `git merge -` to merge past branch
```

This is a very important point in the workflow so let's explain in more detail what is happening. Both `feature-1b.base` and `feature-1b` share a common commit outside of `master`. As a result, this is a known state where the 2 agree upon.

When we merged in the new `feature-1a.squashed` to `feature-1b.base`, we built a new `merge` commit that makes sure `feature-1a` changes take priority as they are **newest**.

When we merge this new `merge` commit into `feature-1b`, we respect all past changes between `feature-1b` and `feature-1b.base`. However, any changes in the new `merge` commit that conflict with the set of `feature-1b.base` changes will be brought up as conflicts. The reason for this is that these commits diverged and occurred after (both time and in `git` history) since the common base (i.e. `feature-1b.base`).

This will be a substantially smaller set (and possibly empty set) than we get with a `rebase` workflow.

Anyway, back to the code:

```bash
# If there are any merge conflicts, sort them out
git mergetool -y

# Diff our base to make sure all the changes we expected exist
git diff feature-1b.base
# Pro-tip: We can open a GitHub window to skip over the diff and verify it looks consistent
# Pro-tip: If we feel something changed, then
#   we can take a diff of our squashed branch to its past commit
#   and compare that diff to the diff in `git diff feature-1b.base`
#   We are diffing our diffs to see any lines missed/added during merging
#   git diff feature-1b.base > new-diff
#   git diff feature-1b.squashed~1..feature-1b.squashed > old-diff
#   diff new-diff old-diff
#      I personally prefer copying to clipboard via `| pbcopy`  or `| xclip` (over `> new-diff`)
#      and using a diff tool in Sublime Text (e.g. FileDiffs)

# Squash our branch for the second PR
git checkout -B feature-1b.squashed
git rebase -i feature-1b.base

# Force push our squashed branch which automatically updates the PR
git push origin feature-1b.squashed --force
```


// TODO: Standardize on first vs 1st

// TODO: Document cleaning up sqwished and base branches
    https://gist.github.com/twolfson/64d592837d38b1e7755b


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

// TODO: We forgot to overwrite base branch after merge in our example
