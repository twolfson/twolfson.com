# Create a temporary git directory
if test -d tmp/solution/; then
  rm -rf tmp/solution/
fi
mkdir -p tmp/solution/
cd tmp/solution/
git init
echo "hi" > file
git add file
git commit --allow-empty -m "Initial commit"

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

# Handle any merge conflicts in a resolution `merge` commit
git mergetool -y
git commit

# Verify there are no differences between our base commit and the squashed revision
# DEV: This is a nice step to debug between branches to verify there are no gotchas
git diff feature-1a.squashed

# Navigate to our second historical branch and merge in the changes to our second base
git checkout feature-1b
git merge feature-1b.base
# Pro-tip: Use `git merge -` to merge past branch
# This is commit `b23456`

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

# Overwrite the `.base` branch with the only squash commit
# DEV: This removes a `merge` commit from our PR
git checkout -B feature-1b.base feature-1a.squashed

# Squash our branch for the second PR
git checkout -B feature-1b.squashed feature-1b
git rebase -i feature-1b.base

# git rebase --continue

# # Force push our squashed branch which automatically updates the PR
# git push origin feature-1b.squashed --force
# # This is commit `bbbbbb`
