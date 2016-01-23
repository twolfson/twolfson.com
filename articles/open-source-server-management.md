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

- [Serverspec][] - Written in Ruby, very mature with lots of platform support
    - Repository also doubles as a great reference for commands/info
- [Inspec][] - Written in Ruby, newly released but written by [Chef][] and based on [Serverspec][]
- [Testinfra][] - Written in Python, relatively new but has good coverage

[Serverspec]: http://serverspec.org/
[Chef]: https://www.chef.io/chef/
[Inspec]: https://github.com/chef/inspec
[Testinfra]: https://github.com/philpep/testinfra

I went with [Serverspec][] due to its age and I knew I was likely going to choose a [Ruby][] tool for higher level provisioning. As a result, I wanted to keep with as few languages as possible (i.e. `bash` and [Ruby][]).

Here is my current test suite:

https://github.com/twolfson/twolfson.com-scripts/tree/2.2.0/test

> As a developer, I prefer to err on the side of stupidity and write tests -- even for trivial changes that I manually verified. There's a common gotcha in the land of provisioning tools where people delete code to clean up legacy provisioning for files. However, they miss needing to write a provision command to delete those files (i.e. delete code, not telling provisioner to delete files then deleting code). This would be easily caught by CI and tests.

[Ruby]: https://www.ruby-lang.org/en/

# Higher level provisioning
Eventually, we will grow from 1 server type to multiple server types (e.g. websites node, Jenkins node). When this happens, we can continue to push `bash` but at some point, it isn't the ideal tool.

In its place, we can use higher level provisioning tools. Instead of being imperative like `bash`, these are declarative and deterministic (i.e. evaluate server state, determine what needs to change, apply changes).

Here are some common tools:

- [Puppet][] - Written in Ruby, has a custom DSL
- [Chef][] - Written in Ruby, our code is actual Ruby
- [Ansible][] - Written in Python

[Puppet]: https://puppetlabs.com/
[Ansible]: http://www.ansible.com/

I chose [Chef][] due to:

- It's Ruby and I want to learn more Ruby
- It's Ruby which helps me stay consistent with [Serverspec][]
    - Keeping the repository down to 2 languages (i.e. `bash`, Ruby)
- It's used by operations engineers that I respect (i.e. [Katherine Daniels][@beerops], [Charity Majors][@mipsytipsy])

[@beerops]: https://twitter.com/beerops
[@mipsytipsy]: https://twitter.com/mipsytipsy

I disliked how opinionated and nested [Chef][] was (e.g. would prefer `require` instead of dependency declarations, would prefer dependency declaration in resources) but I got something which I am comfortable with:

https://github.com/twolfson/twolfson.com-scripts/tree/2.2.0/src

# Links
Here are links to some resources I have found practical:

- [Hiring a Tech Ops Team by Charity Majors](http://www.heavybit.com/library/video/2015-02-24-charity-majors)
- [@twolfson's early iterations with Vagrant and bash](https://github.com/twolfson/vagrant-npm-www/blob/0.1.0/Vagrantfile)
