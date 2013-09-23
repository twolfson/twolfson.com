{
  "title": "Debugging Travis CI",
  "author": "Todd Wolfson",
  "date": "2013/09/22",
  "summary": "How to debug [Travis CI](https://travis-ci.org/) with [Vagrant](http://www.vagrantup.com/)."
}

Earlier this week, I was having trouble getting my tests to run in [Travis CI][]. My use case was running [Sublime Text][] inside of [Travis CI][]. Unfortunately, I was running into issues that can only encounter in a display-less environment.

```
Gtk warning
```

[Travis CI]:
[Sublime Text]:

From there, I knew that I needed to run xvfb to get around this. However, after doing that I was met with another error and stuck for the rest of the night.

```
RANDR extension not found
```

After a bit of research, I discovered that [Travis CI] runs against [Ubuntu 12.03 LTS 64 bit][travis-ubuntu]. Additionally, there was [documentation on versions of software][travis-software] Travis CI was running.

[travis-ubuntu]:
[travis-software]:

To start my mocking, I created a vanilla [Vagrant][vagrant] off of the Ubuntu 64 bit image.

```
precise-64
```

Then, it was a series of thoughtful trial and error to get to the same error message. The important steps for me were:

```python
sudo apt-get install X
```

Once I got to the same error, I found the problem was the tests were running fine but not terminating [Sublime Text][]. I added an exit statement to each test and [Travis CI][] ran flawlessly.

```
... Tests passing
```
