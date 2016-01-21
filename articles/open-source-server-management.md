{
  "title": "Open source server management",
  "author": "Todd Wolfson",
  "date": "2016-01-20T23:05:56-0600",
  "keywords": "scripts, server, management",
  "summary": "Announcement about formalizing and open sourcing my server scripts."
}

For a long while, I have naively managed my server; installing and running processes by hand with a script or 2 to manage rebooting.

Finally, I have decided to formalize my provisioning, write tests, and script everything else.

https://github.com/twolfson/twolfson.com-scripts

# Starting with Vagrant and bash
If you are new to provisioning/bootstrapping servers, I strongly recommend starting with [Vagrant][] and `bash`.

- [Vagrant][] because it's familar for someone to `ssh` into a machine
    - This is identical to logging into a staging or production machine
    - Additionally if something goes wrong, then we can create a new server easily
    - [Docker][] is a viable alternative as well
- `bash` because it's approachable for our coworkers since they use a shell daily
    - It's 1 less tool to learn (as opposed to [Chef][] or [Puppet][])
    - Additionally if something goes wrong, we can use the same commands to debug

[Vagrant]: https://www.vagrantup.com/

Here are iterations of my scripts in [Vagrant][] and `bash`:

https://github.com/twolfson/twolfson.com-scripts/blob/1.14.1/Vagrantfile

https://github.com/twolfson/twolfson.com-scripts/tree/1.14.1/src

https://github.com/twolfson/twolfson.com-scripts/blob/1.12.0/bin/_bootstrap.sh

Here are some protips:

- Always use `set -e` (exits upon first error, by default `bash` doesn't do this)
- Use `set -x` to help with feedback to developer running script
- Learn these tools `which`, `test`, `man`, `grep`, `apt-get`/`apt-cache`, `dpkg`
    - Use `apt-get install` to install/upgrade specific packages
    - Use `apt-cache search/showpkg` to search for packages/list info
    - Use `dpkg --list` to list installed packages (useful with `grep` for scripts)
- Learn `bash` shortcuts (e.g. `ctrl+c`, `ctrl+d`, `ctrl+a`, `ctrl+e`, `ctrl+r`)
    - I recommend [ShortcutFoo][] for learning these

[ShortcutFoo]: https://www.shortcutfoo.com/
