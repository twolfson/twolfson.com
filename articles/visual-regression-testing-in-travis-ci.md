{
  "title": "Visual regression testing in Travis CI",
  "author": "Todd Wolfson",
  "date": "2014-02-25T01:34:50-08:00",
  "keywords": "visual regression, perceptual diff, visual testing, screenshot testing, travis ci",
  "summary": "Guide to getting [visual regression testing/perceptual diffs](http://youtu.be/UMnZiTL0tUc) set up in [Travis CI](https://travis-ci.org/)"
}

[Visual regression tests/perceptual diffs][pdiff-presentation] are a way to test your website to verify the appearance stays consistent.

[pdiff-presentation]: http://youtu.be/UMnZiTL0tUc

// TODO: Add me (LICENSE page with one `d`, two `d's`, and diff; marked as actual, expected, diff)
![Example image of perceptual diff]()

Since the tests are visual, they require consistency across their screenshot environments. The most common problem is different fonts which can lead to alternate renderings. There are a few solutions for this:

- Use near-identical isolated environment to test environment (e.g. [Ubuntu][] [Vagrant][] for [Travis CI][])
- Use consistent isolated sub-environment in development and test environment (e.g [Vagrant][] for both)
    - If your test environment is virtualized, this will not work (e.g. [Travis CI][])
- Generate screenshots in remote environment (e.g. [Sauce Labs][], [BrowserStack][])

[Ubuntu]: http://www.ubuntu.com/
[Vagrant]: http://www.vagrantup.com/
[Travis CI]: https://travis-ci.org/
[Sauce Labs]: https://saucelabs.com/
[BrowserStack]: http://www.browserstack.com/

For this blog post, we will be walking through the first option, near-identical environments.

For [twolfson.com][], I use a home-grown screenshot + [`image-diff`][] script.

https://github.com/twolfson/twolfson.com/blob/3.21.0/test/perceptual-tests/twolfson.com_test.js

There are a few existing solutions if you want something out of the box:

- https://github.com/facebook/huxley
- https://github.com/bslatkin/dpxdt
- https://github.com/BBC-News/wraith
- https://github.com/Huddle/PhantomCSS
- https://github.com/stefanjudis/grunt-photoBox

> At the time I wrote the script, only `dpxdt` existed which was overkill for me.

[twolfson.com]: http://twolfson.com/
[`image-diff`]: http://github.com/uber/image-diff

Once you have your perceptual diffs set up, you should be generating screenshots and diffs locally. Next, install your `.travis.yml` including any dependencies such that the screenshots are being generated in Travis CI as well.

It is likely that the tests will fail because your expected screenshots differ from the actual ones due to different fonts. To see what your extract your screenshots from Travis CI, I have written a script that uploads my actual and diff screenshots to [imgur.com][].

[imgur.com]: http://imgur.com/

```bash
# Install underscore-cli for hacking
if ! which underscore &> /dev/null; then
  npm install -g underscore-cli
fi

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

for filepath in $(find {actual,diff}_screenshots -name '*.png'); do
  result="$(curl http://imgur.com/api/upload.json -H "Expect: " -F "key=$api_key" -F "image=@$filepath" )"
  # result='{"rsp":{"stat":"ok","image":{"image_hash":"dKZ0YK9","delete_hash":"r0MsZp11K9vawLf","original_image":"http:\/\/i.imgur.com\/dKZ0YK9.png","large_thumbnail":"http:\/\/i.imgur.com\/dKZ0YK9l.jpg","small_thumbnail":"http:\/\/i.imgur.com\/dKZ0YK9s.jpg","imgur_page":"http:\/\/imgur.com\/dKZ0YK9","delete_page":"http:\/\/imgur.com\/delete\/r0MsZp11K9vawLf"}}}'
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
```

I integrate with my `.travis.yml` as an upload action upon failure:

```yml
script:
  - 'npm run test-perceptual || (./test/perceptual-tests/upload-screenshots.sh && exit 1)'
```