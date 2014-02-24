#!/usr/bin/env bash

# Navigate to pereceptual-test directory
cd test/perceptual-tests

# Prepare location to collect delete commands
if test "$TRAVIS_BUILD_NUMBER" = ""; then
  TRAVIS_BUILD_NUMBER="dev"
fi
output_dir="tmp/travis/$TRAVIS_BUILD_NUMBER"
download_cmds=""
delete_cmds=""

# curl from http://imgur.com/tools/imgurbash.sh via http://imgur.com/tools
# Documentation: http://code.google.com/p/imgur-api/source/browse/wiki/ImageUploading.wiki?r=82
api_key="b3625162d3418ac51a9ee805b1840452"

# for filepath in $(find {actual,diff}_screenshots -name '%2F.png'); do
for filepath in $(find diff_screenshots -name '%2F.png'); do
  # result="$(curl http://imgur.com/api/upload.json -H "Expect: " -F "key=$api_key" -F "image=@$filepath" )"
  result='{"rsp":{"stat":"ok","image":{"image_hash":"dKZ0YK9","delete_hash":"r0MsZp11K9vawLf","original_image":"http:\/\/i.imgur.com\/dKZ0YK9.png","large_thumbnail":"http:\/\/i.imgur.com\/dKZ0YK9l.jpg","small_thumbnail":"http:\/\/i.imgur.com\/dKZ0YK9s.jpg","imgur_page":"http:\/\/imgur.com\/dKZ0YK9","delete_page":"http:\/\/imgur.com\/delete\/r0MsZp11K9vawLf"}}}'
  if test "$(echo "$result" | underscore extract 'rsp.stat')" != '"ok"'; then
    echo "There was a problem uploading \"$filepath\"" 1>&2
    echo "$result" 1>&2
  else
    download_cmds="${download_cmds}wget -O \"$output_dir/$filepath\" $(echo "$result" | underscore extract 'rsp.image.original_image')\n"
    delete_cmds="${delete_cmds}curl http://imgur.com/api/delete/$(echo "$result" | underscore extract 'rsp.image.delete_hash' --outfmt text).json;"
  fi
done

echo "All uploads complete!"
echo ""
echo "Download via:"
echo "    mkdir -p $output_dir/{actual,diff}_screenshots"
# DEV: `echo -e` processes line feeds
echo -e "    $download_cmds"
echo "Delete via:"
echo -e "    $delete_cmds"
