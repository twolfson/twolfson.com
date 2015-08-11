# Create a temporary git directory
mkdir -p tmp/problem/
cd tmp/problem/
git init

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
git merge feature-1a
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
