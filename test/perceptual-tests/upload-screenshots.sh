# curl from http://imgur.com/tools/imgurbash.sh via http://imgur.com/tools
api_key="b3625162d3418ac51a9ee805b1840452"
filepath="test/perceptual-diffs/actual_screenshots/%2F.png"
curl http://imgur.com/api/upload.xml -H "Expect: " -F "key=$api_key" -F "image=@$filepath"
