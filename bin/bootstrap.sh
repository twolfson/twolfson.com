#!/usr/bin/env bash
# Exit on first error
set -e

# Create a temporary folder to work in
if test -d tmp/bootstrap; then
  rm -r tmp/bootstrap;
fi
mkdir -p tmp/bootstrap

# Download front-end dependencies
curl 'https://rawgit.com/ded/domready/b3ba502dcd41b67fc2fcd06416b9d0be27a8dce2/ready.js' > 'public/js/ready.js'
curl 'https://rawgit.com/ccampbell/gator/1.2.2/gator.js' > 'public/js/gator.js'
curl 'https://rawgit.com/ccampbell/gator/1.2.2/plugins/gator-legacy.js' > 'public/js/gator-legacy.js'
curl 'http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js' > 'test/test_files/jquery.js'

# Download development dependencies
curl 'https://rawgit.com/peol/960gridder/master/releases/1.3.1/960.gridder.src.js' > 'public/js/960gridder/960.gridder.js'
curl 'http://peol.github.io/960gridder/releases/1.3.1/jquery.js' > 'public/js/960gridder/jquery.js'
