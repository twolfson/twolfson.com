{
  "title": "Taken for granted: Regression tests",
  "author": "Todd Wolfson",
  "date": "2014-05-28T23:42:55-07:00",
  "keywords": "taken for granted, regression tests, protip",
  "summary": "There are some &quot;a-ha&quot; moments on the road to becoming a better developer. This article visits one of mine, regression tests."
}

[Visual regression tests/perceptual diffs][pdiff-presentation] are a way to test your website to verify the appearance stays consistent.

[pdiff-presentation]: http://youtu.be/UMnZiTL0tUc

[![Example image of perceptual diff][example-diff]][example-diff]

[example-diff]: /public/images/articles/visual-regression/example-diff.png

For [twolfson.com][], I use a home-grown screenshot + [`image-diff`][] script.

https://github.com/twolfson/twolfson.com/blob/3.21.0/test/perceptual-tests/twolfson.com_test.js

If you want something out of the box, there are a few existing solutions:

- https://github.com/facebook/huxley
- https://github.com/bslatkin/dpxdt
- https://github.com/BBC-News/wraith
- https://github.com/Huddle/PhantomCSS
- https://github.com/stefanjudis/grunt-photoBox

> At the time I wrote the script, only `dpxdt` existed which was overkill for me.

[twolfson.com]: http://twolfson.com/
[`image-diff`]: http://github.com/uber/image-diff

Once you have your test suite set up, add in [Travis CI][]. After the first test run, you should run into consistency issues (e.g. fonts are not the same). There are a few solutions for this:

- Use near-identical isolated environment to test environment (e.g. [Ubuntu][] [Vagrant][] for [Travis CI][])
- Use consistent isolated sub-environment in development and test environment (e.g [Vagrant][] for both)
    - If your test environment is virtualized, this will not work (e.g. [Travis CI][])
- Generate screenshots in remote environment (e.g. [Sauce Labs][], [BrowserStack][])

[Ubuntu]: http://www.ubuntu.com/
[Vagrant]: http://www.vagrantup.com/
[Travis CI]: https://travis-ci.org/
[Sauce Labs]: https://saucelabs.com/
[BrowserStack]: http://www.browserstack.com/

For this blog post, we will be walking through setting up near-identical environments.

To gain insight into what Travis CI's screenshots look like I have written a script that uploads my actual and diff screenshots to [imgur.com][].

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

Inside my `.travis.yml`, I run the upload script when a failure occurs:

```yml
script:
  - 'npm run test-perceptual || (./test/perceptual-tests/upload-screenshots.sh && exit 1)'
```

The result is something like https://travis-ci.org/twolfson/twolfson.com/jobs/19562314 which presents me with a long list of `wget` commands to download my diffs and screenshots for local browsing.

```bash
Download via:
    mkdir -p tmp/travis/104/{actual,diff}_screenshots
    wget -O "tmp/travis/104/actual_screenshots/%2F500.png" "http://i.imgur.com/0A6KhoL.png"
    wget -O "tmp/travis/104/actual_screenshots/%2F2013-07-24-abandoned-project%3A-kaleidoscope.png" "http://i.imgur.com/KAldKME.png"
...
```

Here is an example set of images:

[![Example set of downloaded images][local-images]][local-images]

[local-images]: /public/images/articles/visual-regression/local-images.png

With the set of images, I can see the discrapencies and aim to resolve them. In my case, it is fonts that give me the most trouble. To remedy this, I use a [`Vagrantfile`][Vagrant] that mimics [Travis CI][] as close as possible.

[Travis CI][] runs an [Ubuntu 12.04 LTS][Ubuntu] image. More info can be found here:

http://docs.travis-ci.com/user/ci-environment/

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  # Install test dependencies
  # Then, use `vagrant ssh` to run your screenshot commands
end
```

Then, I rely on Vagrant to generate a local set of expected screenshots and deliver them to [Travis CI][].

If the stars align, then the expected images will match and your tests will pass.  ![passing.png](/public/images/articles/visual-regression/passing.png)
