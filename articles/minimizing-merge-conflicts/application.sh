# Create a temporary git directory
if test -d tmp/application/; then
  rm -rf tmp/application/
fi
mkdir -p tmp/application/
cd tmp/application/
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

# SPACER

# Land our first PR
git checkout master
git merge feature-1a.squashed
git push origin master

# Land our second PR
git merge feature-1b.squashed
git push origin master
