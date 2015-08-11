{
  "title": "Minimizing merge conflicts",
  "author": "Todd Wolfson",
  "date": "2015-08-06T01:31:17-0500",
  "keywords": "merge, conflict, git, rebase, historical",
  "summary": "An guide to a `git` workflow which minimizes merge conflicts."
}

Pull requests should always be:

- Focused on a single feature (e.g. any lint corrections should be separate)
- Digestible (e.g. maximum of 150 lines changed)

The reasoning for these requisites are:

- Allows us to identify/create better abstractions
- Makes it easier for reviewing and re-reviewing changes in a timely manner

This article is a guide to managing branches on a complex/high velocity project (e.g. a lot of changes/PRs occur frequently). While it works for other scenarios, it might be overkill (e.g. documentation fixes).

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

# Squash our commits
git rebase feature-1a -i
# New commit is now b22222

# Push our updated PR
git push origin feature-1b --force
```

# Solution
To solve this problem, we are going to lean on git's ability to handle non-squashed merges well.

## Historical and squashed branches
As foundation for our solution, we have 2 branches per new feature:

- `feature` branch, operates like its own `master` branch for the feature (historical branch)
- `feature.squashed` branch, all work from `feature` branch in 1 commit (squashed branch)

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
git checkout -B feature.squashed
git rebase -i master # Squash all commits

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
Now that we are established with the historical/squashed workflow, let's apply it to the first example:

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
git checkout -B feature-1a.squashed
git rebase -i master
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
git checkout -B feature-1b.squashed
git rebase -i feature-1b.base
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

We don't land `feature-1b.squashed` directly, as we should detect conflicting merges at the first PR.

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
git checkout -B feature-1a.squashed
git rebase -i master
# This is commit `a22222`

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

This is a very important point in the workflow so let's explain in more detail what is happening.

Both `feature-1b.base` and `feature-1b` share a common commit outside of `master`. As a result, this is a known state where the 2 agree upon.

When we merged in the new `feature-1a.squashed` to `feature-1b.base`, we built a new `merge` commit that makes sure `feature-1a` changes take priority as they are **newest**.

When we merge this new `merge` commit into `feature-1b`, `git` respects all past changes between `feature-1b` and `feature-1b.base`. However, any changes in the new `merge` commit that conflict with the set of changes since `feature-1b.base` will be brought up as conflicts.

These conflicts will be a smaller (possibly empty) set than a typical `rebase` workflow.

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

# If there are any changes that we didn't want, then we can use
#   git checkout -p {branch} # Uses patch mode to select bits from {branch}
#   git checkout -p {branch} -- {filepath} # Same as last command, specific to 1 file
#   git reset -p # Uses patch mode to unstage specific parts of our staged changes
#   git stash -p # Uses patch mode to stash specific parts of our working directory
#   git add -p # Uses patch mode to stage specific parts of our working directory

# Save our changes
git commit
# This is commit `b23456`

# Overwrite the `.base` branch with the only squash commit
# DEV: This removes a `merge` commit from our PR
git checkout -B feature-1b.base feature-1a.squashed

# Squash our branch for the second PR
git checkout -B feature-1b.squashed feature-1b
git rebase -i feature-1b.base

# Force push our squashed branch which automatically updates the PR
git push origin feature-1b.squashed --force
# This is commit `bbbbbb`
```

## Aftermath
Once our PR is landed and deployed, we can clean up our branches via `git-delete-branch` from [git-extras][].

My preferred cautious course is to do this over a few commands:

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

- `git-sqwish`, a `git` utility that always squashes commits and yields a commit message
    - This is preferable to always needing to select `squash` from `git rebase -i`
    - https://github.com/twolfson/git-sqwish
- `git shortref`, a `git` utility that returns name of current branch
    - I actually use an alias from `sexy-bash-prompt`
        - https://github.com/twolfson/sexy-bash-prompt/blob/0.26.1/.bash_prompt#L100-L109
    - But you can use the following in your global `.gitconfig` under `[alias]`
        - `shortref = symbolic-ref --short HEAD`
    - This can be used like `git checkout -B "$(git shortref).squashed"`

// TODO: Add some commands to play with this example at home, maybe in a gist
// TODO: Do the same example thing for the very first example
