#!/usr/bin/env bash

# Navigate to pereceptual-test directory
cd test/perceptual-tests

# Prepare location to collect delete commands
delete_cmds=""

# curl from http://imgur.com/tools/imgurbash.sh via http://imgur.com/tools
# Documentation: http://code.google.com/p/imgur-api/source/browse/wiki/ImageUploading.wiki?r=82
api_key="b3625162d3418ac51a9ee805b1840452"

# for filepath in $(find {actual,diff}_screenshots -name '%2F.png'); do
for filepath in $(find diff_screenshots -name '%2F.png'); do
  result="$(curl http://imgur.com/api/upload.json -H "Expect: " -F "key=$api_key" -F "image=@$filepath" )"
  if test "$(echo "$result" | underscore extract 'rsp.stat')" != '"ok"'; then
    echo "There was a problem uploading \"$filepath\"" 1>&2
    echo "$result" 1>&2
  else
    echo "Uploaded \"$filepath\" -> $(echo "$result" | underscore extract 'rsp.image.original_image')"
    delete_cmds="$delete_cmds curl http://imgur.com/api/delete/$(echo "$result" | underscore extract 'rsp.image.delete_hash' --outfmt text).json;"
  fi
done

echo "All uploads complete!"
echo ""
echo "Delete via:"
echo "    $delete_cmds"
