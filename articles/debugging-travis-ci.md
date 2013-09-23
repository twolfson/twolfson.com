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