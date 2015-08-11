# Create a temporary git directory
if test -d tmp/problem/; then
  rm -rf tmp/problem/
fi
mkdir -p tmp/problem/
cd tmp/problem/
git init
git checkout -b feature-1a
echo "hello" > file
git add file
git commit -m "Added hello file"
git checkout -b feature-1b
echo "world" > file2
git add file2
git commit -m "Added world file"

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
git rebase --continue
# New commit is now b22222

# Push our updated PR
git push origin feature-1b --force
