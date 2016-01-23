{
  "title": "Open source server management",
  "author": "Todd Wolfson",
  "date": "2016-01-20T23:05:56-0600",
  "keywords": "scripts, server, management",
  "summary": "Announcement about formalizing and open sourcing my server scripts."
}

For a while I have naively managed my server; installing and running processes by hand with a script or 2 to manage restarting.

Finally, I have decided to formalize my scripts, add tests, and document everything.

https://github.com/twolfson/twolfson.com-scripts

The remainder of this article documents the path I took and why you should follow a similar trajectory.

# Starting with Vagrant and bash
If you are new to provisioning/bootstrapping servers, I strongly recommend starting with [Vagrant][] and `bash`.

- [Vagrant][] because `ssh`-ing into a machine is a familiar action
    - Identical to logging into a staging or production machine
    - If something goes wrong, then we can create a new server easily
    - [Docker][] is a viable alternative as well
- `bash` because it's approachable since we use a shell daily
    - If we are doing this for work, then it's 1 less tool for everyone to learn (as opposed to [Chef][] or [Puppet][])
    - If something goes wrong, then we can use the same commands to debug

[Vagrant]: https://www.vagrantup.com/
[Docker]: https://www.docker.com/

Here are iterations of my scripts in [Vagrant][] and `bash`:

https://github.com/twolfson/twolfson.com-scripts/blob/1.14.1/Vagrantfile

https://github.com/twolfson/twolfson.com-scripts/tree/1.14.1/src

https://github.com/twolfson/twolfson.com-scripts/blob/1.12.0/bin/_bootstrap.sh

Here are some protips:

- Always use `set -e` (exits upon first error, by default `bash` doesn't do this)
- Use `set -x` to help with feedback to developer running script
- Learn these tools `which`, `test`, `man`, `grep`, `find`, `apt-get`/`apt-cache`, `dpkg`
    - Use `apt-get install` to install/upgrade specific packages
    - Use `apt-cache search/showpkg` to search for packages/list info
    - Use `dpkg --list` to list installed packages (useful with `grep` for scripts)
- Learn `bash` shortcuts (e.g. `ctrl+c`, `ctrl+d`, `ctrl+a`, `ctrl+e`, `ctrl+r`)
    - I recommend [ShortcutFoo][] for learning these

[ShortcutFoo]: https://www.shortcutfoo.com/

# Testing
After getting provisioning scripts set up, we should integrate tests. This lets us confirm everything is setup as expected without manually checking everything every time.

Some testing tools are:

- [Serverspec][] - Written in Ruby, mature with support for many platforms
    - Repository also doubles as a great reference for commands
- [Inspec][] - Written in Ruby, newly released but written by [Chef][] and based on [Serverspec][]
- [Testinfra][] - Written in Python, relatively new but has good coverage

[Serverspec]: http://serverspec.org/
[Chef]: https://www.chef.io/chef/
[Inspec]: https://github.com/chef/inspec
[Testinfra]: https://github.com/philpep/testinfra

I went with [Serverspec][] because:

- It's mature and well used
- I knew I was going to choose [Ruby][] for higher level provisioning
    - To keep repo approachable, I wanted at most 2 languages (i.e. `bash` and [Ruby][])

Here is my current test suite:

https://github.com/twolfson/twolfson.com-scripts/tree/2.4.1/test

https://github.com/twolfson/twolfson.com-scripts/blob/2.4.1/.travis.yml

> As a forewarning, there's a common gotcha with respect to provisioning tools. When deleting files, be sure to add a command to remove (e.g. `rm`, `action(:remove)`) and provision before removing the code. Otherwise, legacy files will not get deleted if their "add" code is removed. When we have tests, these trivial issues are more likely to be caught.

[Ruby]: https://www.ruby-lang.org/en/

# Higher level provisioning
Eventually we will grow from 1 server type to multiple server types (e.g. web apps node, Jenkins node). When this happens, we can continue to use `bash` but at some point, it isn't the ideal tool.

In its place, we can use higher level provisioning tools. Instead of being imperative like `bash`, these are declarative and deterministic (i.e. evaluate server state, determine what needs to change, apply changes).

Some common tools are:

- [Puppet][] - Written in Ruby, has a custom DSL
- [Chef][] - Written in Ruby, defines classes and methods
- [Ansible][] - Written in Python

[Puppet]: https://puppetlabs.com/
[Ansible]: http://www.ansible.com/

I chose [Chef][] due to:

- It's Ruby which helps me stay consistent with [Serverspec][]
    - Keeping the repository down to 2 languages (i.e. `bash`, Ruby)
- It's used by operations engineers that I respect (i.e. [Katherine Daniels][@beerops], [Charity Majors][@mipsytipsy])

[@beerops]: https://twitter.com/beerops
[@mipsytipsy]: https://twitter.com/mipsytipsy

I should mention that I disliked how opinionated and nested [Chef][] was but I got something which I am comfortable with:

https://github.com/twolfson/twolfson.com-scripts/tree/2.4.1/src

# Links
Here are links to some resources I have found useful:

- [Hiring a Tech Ops Team by Charity Majors](http://www.heavybit.com/library/video/2015-02-24-charity-majors)
- [@twolfson's early iterations with Vagrant and bash](https://github.com/twolfson/vagrant-npm-www/blob/0.1.0/Vagrantfile)
