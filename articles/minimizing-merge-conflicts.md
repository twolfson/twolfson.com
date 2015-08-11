{
  "title": "Minimizing merge conflicts",
  "author": "Todd Wolfson",
  "date": "2015-08-06T01:31:17-0500",
  "keywords": "merge, conflict, git, rebase, historical",
  "summary": "A guide to a `git` workflow which minimizes merge conflicts."
}

Pull requests (PRs) should always be:

- Focused on a single feature
- Digestible (e.g. maximum of 150 lines changed)

The reasoning for these requisites are:

- Allows us to identify/create better abstractions
- Makes it easier for reviewing and re-reviewing changes in a timely manner

This article is a guide to managing branches on a complex/high velocity project (e.g. a lot of changes/PRs occur frequently).

# Setup
We are on a project which:

- Requires squashed PRs
- We are implementing dependent features (e.g. abstract a utility function, use utility in new feature)

```
        o feature-1b (bbbbbb)
       /
      o feature-1a (aaaaaa)
     /
o---o master (ffffff)
```

which ultimately winds up as:

```
o---o---o---o master, feature-1b (bbbbbb)
```

# Problem
Typical workflows like `git rebase`, `git commit --amend`, and `git merge --squash` fall apart when an earlier PRs needs a change. For example, adding a comment for clarity on `feature-1a` leading to:

```
        o feature-1b (b22222)
       /
      o feature-1a (a22222)
     /
o---o master (ffffff)
```

Most ways of doing this lead to hard to debug merge conflicts. Here is an amateur example:

```bash
# Navigate to our first PR's branch
git checkout feature-1a

# Edit our file
echo "# This is a clarifying comment" >> file.txt

# Update our PR commit
git add file.txt
git commit --amend --no-edit
# New commit is now a22222

# Push our updated PR
git push origin feature-1a --force

# Navigate to our second PR's branch
git checkout feature-1b

# Merge in our past work
git merge feature-1a --no-edit
# Pro-tip: Use `git merge -` to merge past branch

# Sort out our merge conflicts
git mergetool -y
# Need to update every file that was edited in `bbbbbb`
# Additionally, hard to know if we kept all of our intended changes

# Commit our edits
git commit --no-edit

# Squash our commits via `git rebase`
git rebase feature-1a -i
git rebase --continue
# New commit is now b22222

# Push our updated PR
git push origin feature-1b --force
```

# Solution
To solve this problem, we are going to lean on git's ability to handle non-squashed merges well.

## Historical and squashed branches
As foundation for our solution, we have 2 branches per new feature:

- A historical branch which operates like its own `master` branch for the feature
    - Typically named `{{feature}}` (e.g. `add-homepage`)
- A squashed branch which has all work from our historical branch in 1 commit
    - Typically named `{{feature}}.squashed` (e.g. `add-homepage.squashed`)

Here is an example workflow:

```bash
# Work on and build our historical branch
git checkout -b feature
echo "hello" > file
git add file
git commit -m "Added hello file"
echo "world" > file2
git add file2
git commit -m "Added world file"

# Generate squashed branch for our PR
# DEV: We use -B to overwrite any past squashed branches
# DEV: `merge --squash` combines all changes from `feature` into 1 commit
git checkout -B feature.squashed master
git merge --squash feature
git commit -m "Added hello and world files"

# Push our squashed branch and open PR for `feature.squashed` to `master`
git push origin feature.squashed
```

Here's a visualization of our `git` history:

```
        +---o feature.squashed (aaaaaa)
       /
      /---o---o feature (a12345)
     /
o---o master (ffffff)
```

When we land this PR, it will look like:

```
o---o---o master, feature.squashed (aaaaaa)
```

## Application
Now that we are established with the historical/squashed workflow, let's apply it to our first example:

```
        o feature-1b (bbbbbb)
       /
      o feature-1a (aaaaaa)
     /
o---o master (ffffff)
```

For the purpose of dependent PRs, we are going to add one more concept known as a `base` branch. This is where the historical branch forked from it's dependent branch. For our example, this will look like:

```
                +---o feature-1b.squashed (bbbbbb)
               /
              /---o---o feature-1b (b12345)
             /
        +---o feature-1a.squashed, feature-1b.base (aaaaaa)
       /
      /---o---o feature-1a (a12345)
     /
o---o master (ffffff)
```

To reiterate, the contents of `a12345` and `aaaaaa` are the same (similarly with `b12345` and `bbbbbb`).

Building the current `git` structure would look like:

```bash
# Build our feature-1a on a historical branch
git checkout -b feature-1a
echo "hello" > file
git add file
git commit -m "Added hello file"
# This is commit `a12345`

# Squash into our feature-1a squashed branch
git checkout -B feature-1a.squashed master
git merge --squash feature-1a
git commit -m "Added hello file"
# This is commit `aaaaaa`

# Open our first PR
git push origin feature-1a.squashed

# Mark our origin for feature-1b
git checkout -b feature-1b.base

# Build our feature-1b on a historical branch
git checkout -b feature-1b
echo "world" > file2
git add file2
git commit -m "Added world file"
# This is commit `b12345`

# Squash into our feature-1b squashed branch
#   but for this one, we base off of our feature-1b base
git checkout -B feature-1b.squashed feature-1b.base
git merge --squash feature-1b
git commit -m "Added world file"
# This is commit `bbbbbb`

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

We don't land `feature-1b.squashed` directly, as we should detect conflicting merges at each PR.

## Solution in action
As with the initial problem, we will now update our first PR. The result will look like:

```
                +---o feature-1b.squashed (b22222)
               /
              /---o---o feature-1b (b23456)
             /
        +---o feature-1a.squashed, feature-1b.base (a22222)
       /
      /---o---o---o feature-1a (a23456)
     /
o---o master (ffffff)
```

```bash
# Checkout our first historical branch
git checkout feature-1a
echo "hello world" > file
git add file
git commit -m "Corrected file's content"
# This is commit `a23456`

# Update our squashed branch (still using -B to override the branch)
git checkout -B feature-1a.squashed master
git merge --squash feature-1a
git commit -m "Added hello file"
# This is commit `a22222`

# Force push our squashed branch which automatically updates the PR
git push origin feature-1a.squashed --force

# Navigate to our base for the second feature and merge in our changes
git checkout feature-1b.base
git merge feature-1a.squashed
# Pro-tip: Use `git merge -` to merge past branch

# Handle any merge conflicts in a resolution `merge` commit
git mergetool -y
git commit

# Verify there are no differences between our base and its origin
# DEV: This is a nice step between branches to verify there are no gotchas
git diff feature-1a.squashed

# Navigate to our second historical branch and merge its base changes
git checkout feature-1b
git merge feature-1b.base
# Pro-tip: Use `git merge -` to merge past branch
# This is commit `b23456`
```

This is a very important point in the workflow so let's explain in more detail what is happening.

Both `feature-1b.base` and `feature-1b` share a common commit (`aaaaaa`) outside of `master`. As a result, this is a known state where the 2 agree upon.

When we merged in the new `feature-1a.squashed` to `feature-1b.base`, we built a new `merge` commit (`a22222*`) that makes sure `feature-1a` changes take priority as they are **newest** .

When we merge this new `merge` commit (`a22222*`) into `feature-1b` (`b12345`), `git` respects all past changes between `feature-1b` and `feature-1b.base`. However, any changes in the new `merge` commit that conflict with the set of changes since `feature-1b.base` will be brought up as conflicts.

These conflicts will be a smaller (possibly empty) set than a typical `rebase` workflow.

Anyway, back to the code:

```bash
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
#      I prefer copying to clipboard over writing to files (e.g. `| xclip -selection c`)
#      and using a diff tool in Sublime Text (e.g. FileDiffs)

# If there are any changes that we didn't want, then we can use
#   git checkout -p {branch} # Uses patch mode to select bits from {branch}
#   git checkout -p {branch} -- {filepath} # Same as last command, specific to 1 file
#   git reset -p # Uses patch mode to unstage specific parts of our staged changes
#   git stash -p # Uses patch mode to stash specific parts of our working directory
#   git add -p # Uses patch mode to stage specific parts of our working directory

# Overwrite the `.base` branch with the only squash commit
# DEV: This removes a `merge` commit from our PR (`a22222*` -> `a22222`)
git checkout -B feature-1b.base feature-1a.squashed

# Squash our branch for the second PR
git checkout -B feature-1b.squashed feature-1b.base
git merge --squash feature-1b
git commit -m "Added world file"

# Force push our squashed branch which automatically updates the PR
git push origin feature-1b.squashed --force
# This is commit `bbbbbb`
```

## Cleanup
Once our PR is landed and deployed, we can clean up our branches via `git-delete-branch` from [git-extras][].

I prefer to be cautious and perform this over a few commands:

```
# Find which branches have recently been merged in
git checkout master
git branch --merged
#   feature-1a.squashed
#   feature-1b.squashed
# * master

# Generate a grep to find all relevant branches
git branch | grep -E 'feature-1a|feature-1b'
#   feature-1a
#   feature-1a.squashed
#   feature-1b
#   feature-1b.base
#   feature-1b.squashed

# Run each of our branches against `git-delete-branch`
git branch | grep -E 'feature-1a|feature-1b' | xargs git-delete-branch
```

[git-extras]: https://github.com/tj/git-extras

# Additional tooling
In order to make my life easier, I have written 2 tools that I use with this workflow:

- `git-sqwish`, a `git` utility to automate `.squashed` branch generation
    - Verifies the branch is clean, generates our squashed branch, has a commit prompt (a la rebase), and rolls back upon failure
    - https://github.com/twolfson/git-sqwish
- `git shortref`, a `git` utility that returns name of current branch
    - Define the following in your global `.gitconfig` under `[alias]`
        - `shortref = symbolic-ref --short HEAD`
    - This can be used like `git checkout -B "$(git shortref).squashed"`
