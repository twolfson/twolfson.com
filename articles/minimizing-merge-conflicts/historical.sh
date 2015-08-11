# Create a temporary git directory
if test -d tmp/historical/; then
  rm -rf tmp/historical/
fi
mkdir -p tmp/historical/
cd tmp/historical/
git init
echo "hi" > file
git add file
git commit --allow-empty -m "Initial commit"

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
git checkout -B feature.squashed master
git merge --squash feature
git commit -m "Added hello and world files"

# Push our squashed branch and open PR for `feature.squashed` to `master`
git push origin feature.squashed
