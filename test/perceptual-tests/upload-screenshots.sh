#!/usr/bin/env bash

# Install underscore-cli for hacking
if ! which underscore &> /dev/null; then
  sudo npm install -g underscore-cli
fi

delete_cmds=""

# curl from http://imgur.com/tools/imgurbash.sh via http://imgur.com/tools
# Documentation: http://code.google.com/p/imgur-api/source/browse/wiki/ImageUploading.wiki?r=82
api_key="b3625162d3418ac51a9ee805b1840452"
filepath="test/perceptual-tests/actual_screenshots/%2F.png"
# result="$(curl http://imgur.com/api/upload.json -H "Expect: " -F "key=$api_key" -F "image=@$filepath" )"
result='{"rsp":{"stat":"ok","image":{"image_hash":"dKZ0YK9","delete_hash":"r0MsZp11K9vawLf","original_image":"http:\/\/i.imgur.com\/dKZ0YK9.png","large_thumbnail":"http:\/\/i.imgur.com\/dKZ0YK9l.jpg","small_thumbnail":"http:\/\/i.imgur.com\/dKZ0YK9s.jpg","imgur_page":"http:\/\/imgur.com\/dKZ0YK9","delete_page":"http:\/\/imgur.com\/delete\/r0MsZp11K9vawLf"}}}'
if test "$(echo "$result" | underscore extract 'rsp.stat')" != '"ok"'; then
  echo "There was a problem uploading \"$filepath\"" 1>&2
  echo "$result" 1>&2
else
  echo "Uploaded \"$filepath\""
  echo "    Image URL: $(echo "$result" | underscore extract 'rsp.image.original_image')"
  delete_cmds="$delete_cmds; curl http://imgur.com/api/delete/$(echo "$result" | underscore extract 'rsp.image.delete_hash' --outfmt text).json"
fi

echo "Delete via:"
echo "    $delete_cmds"
