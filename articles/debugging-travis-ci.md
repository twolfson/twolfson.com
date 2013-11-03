{
  "title": "Debugging Travis CI",
  "author": "Todd Wolfson",
  "date": "2013/09/22",
  "keywords": "debugging, travis ci, vagrant, headless",
  "summary": "How to debug [Travis CI](https://travis-ci.org/) with [Vagrant](http://www.vagrantup.com/)."
}

Earlier this week, I was having trouble getting my tests to run in [Travis CI][]. My use case was running [Sublime Text][] inside of [Travis CI][]. Unfortunately, I was running into issues that can only encounter in a display-less environment.

```bash
$ ./test.sh
(sublime_text:1080): Gtk-WARNING **: cannot open display: :0
```

[Travis CI]: http://travis-ci.org/
[Sublime Text]: http://sublimetext.com/

From there, and reading enough articles about [PhantomJS][], I knew that I needed to run `Xvfb` to get around this.

[PhantomJS]: http://phantomjs.org/

```yml
# Inside of .travis.yml
before_script:
  - export DISPLAY=:99.0
  - sh -e /etc/init.d/xvfb start
```

However, after doing that I was met with another error and stuck for the rest of the night.

```bash
$ ./test.sh
Xlib:  extension "RANDR" missing on display ":99.0".
```

The next day, I began to research and discovered that Travis CI's tests are run inside of a [Ubuntu 12.04 LTS 64 bit][travis-ubuntu] virtual machine. Additionally, there was [documentation on versions of software][travis-software].

[travis-ubuntu]: http://about.travis-ci.org/docs/user/ci-environment/#CI-environment-OS
[travis-software]: http://about.travis-ci.org/docs/user/ci-environment/#Environment-common-to-all-VM-images

I decided to mock this environment via [Vagrant][], a development environment management program. I created a [Vagrant][] using the vanilla [Ubuntu 64 bit base image][vagrant-boxes].

[Vagrant]: http://www.vagrantup.com/
[vagrant-boxes]: http://www.vagrantbox.es/

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"
end
```

Then, it was a series of thoughtful trial and error to get to the same error message. The important steps for me were:

```bash
# Install xvfb and libgtk2.0-0
sudo apt-get install xvfb
sudo apt-get install libgtk2.0-0

# Install `sublime_text`
wget 64bit-sublime-text.tar.bz2
tar xvf 64bit-sublime-text.tar.bz2
ln -s $PWD"/Sublime Text 2/sublime_text" /usr/bin/sublime_text

# Trial and error with Xvfb
xvfb -screen 0 1024x768x24
./test.sh
```

Once I got to the same error, I found the problem was the tests were running fine but not terminating [Sublime Text][]. I added an `exit` statement to each test and [Travis CI][] ran flawlessly.

> As it turns out, you *really* are supposed to ignore the `Xlib` error for `RANDR`.

```
$ ./test.sh
Xlib: extension "RANDR" missing on display ":99.0".
.Xlib: extension "RANDR" missing on display ":99.0".
.Xlib: extension "RANDR" missing on display ":99.0".
.
----------------------------------------------------------------------
Ran 3 tests in 2.023s

OK
```
