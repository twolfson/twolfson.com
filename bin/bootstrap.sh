#!/usr/bin/env bash
# Exit on first error
set -e

# Create a temporary folder to work in
if test -d tmp/bootstrap; then
  rm -r tmp/bootstrap;
fi
mkdir -p tmp/bootstrap

# Download front-end dependencies
# TODO: Transfer `curl`/`wget` actions to `bower` where plausible
# TODO: Document sprite sources in a README rather than via `curl's`
curl "https://rawgit.com/ded/domready/b3ba502dcd41b67fc2fcd06416b9d0be27a8dce2/ready.js" > "public/js/ready.js"
curl "https://rawgit.com/ccampbell/gator/1.2.2/gator.js" > "public/js/gator.js"
curl "https://rawgit.com/ccampbell/gator/1.2.2/plugins/gator-legacy.js" > "public/js/gator-legacy.js"
curl "http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js" > "test/test_files/jquery.js"

pushd public/css/mixins
wget "https://rawgit.com/thoughtbot/bourbon/v3.0.1/app/assets/stylesheets/addons/_prefixer.scss"
wget "https://rawgit.com/thoughtbot/bourbon/v3.0.1/app/assets/stylesheets/functions/_compact.scss"
wget "https://rawgit.com/thoughtbot/bourbon/v3.0.1/app/assets/stylesheets/css3/_box-shadow.scss"
wget "https://rawgit.com/thoughtbot/bourbon/v3.0.1/app/assets/stylesheets/css3/_linear-gradient.scss"
wget "https://rawgit.com/thoughtbot/bourbon/v3.0.1/app/assets/stylesheets/css3/_transition.scss"
popd

# Download development dependencies
# DEV: We have modified `960.gridder.js` a little it seems
# curl "https://rawgit.com/peol/960gridder/677b61a7df2e6f83b6b4437fecb027fb94359f26/releases/1.3.1/960.gridder.src.js" \
  # > "public/js/960gridder/960.gridder.js"
curl "https://rawgit.com/peol/960gridder/677b61a7df2e6f83b6b4437fecb027fb94359f26/releases/1.3.1/jquery.js" \
  > "public/js/960gridder/jquery.js"

# Download external sprites
# Bitcoin - http://bitcoin.org/en/press
# DEV: Looks like URL is no longer up
# curl "https://docs.google.com/uc?export=view&id=0BwnE6HIoU4a4bUswMm5UWS1XakU" > "public/images/support_src/bitcoin.png"
# Dogecoin - http://imgur.com/a/CKqPP
curl "http://i.imgur.com/K2LYlv4.png" > "public/images/support_src/dogecoin.png"
# Gratipay - Google image search
# DEV: Looks like URL is no longer up
# curl "http://s3.amazonaws.com/catapultpgh-madeinpgh/app/public/system/logos/7/medium/gratipay-logo-256.png?1367418240" \
#   > "public/images/support_src/gratipay.png"

# Download, unzip, and install inuit.css
pushd tmp/bootstrap
wget "https://github.com/csswizardry/inuit.css/archive/v5.0.0.zip" --output-document "inuit.css.zip"
unzip "inuit.css.zip"
rm -r ../../public/css/inuit
mv --no-target-directory "inuit.css-5.0.0" ../../public/css/inuit
