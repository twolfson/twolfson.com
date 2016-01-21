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

# Starting with bash
If you are new to provisioning/bootstrapping servers, I strongly recommend doing everything in `bash` or something similar (e.g. [Fabric][]).

[Fabric]: http://www.fabfile.org/

It will be approachable for your coworkers as they use a shell daily and 1 less tool to learn.

Additionally, if things ever go bad, then you will be able to use the same commands to debug.

Here's some quick protips:

- Always use `set -e` (exits upon first error, by default `bash` doesn't do this)
- Use `set -x` to help with feedback to developer running script
- Learn these tools `which`, `test`, `man`, `grep`, `apt-get`/`apt-cache`, `dpkg`)
    - Use `apt-get install` to install/upgrade specific packages
    - Use `apt-cache search/showpkg` to search for packages/list info
    - Use `dpkg --list` to list installed packages (useful with `grep` for scripts)
- Learn `bash` shortcuts (e.g. `ctrl+c`, `ctrl+d`, `ctrl+a`, `ctrl+e`, `ctrl+r`)
    - I recommend [ShortcutFoo][] for learning these

[ShortcutFoo]: https://www.shortcutfoo.com/
