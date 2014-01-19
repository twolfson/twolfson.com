{
  "title": "A better shell",
  "author": "Todd Wolfson",
  "date": "2013/07/06",
  "keywords": "bash, zsh, shell",
  "summary": "Thoughts on taking steps to make a better shell.",
  "relatedArticles": ["Sexy bash prompt"]
}

A coworker sent me a [harmless tweet][kr-tweet] about using [zsh][zsh] over [bash][bash]. This got me thinking about how "good" these shells are.

[kr-tweet]: https://twitter.com/realkevinroth/status/353560677081808896
[zsh]: http://www.zsh.org/
[bash]: https://en.wikipedia.org/wiki/Bash_%28Unix_shell%29

The differences are default usability and plugins but the infrastructure for a fluid ecosystem is lacking (a la [Sublime Text][pkg-ctrl]).

[pkg-ctrl]: http://wbond.net/sublime_packages/package_control

What if there was a shell which was built for `dotfiles`? `dotfiles` as a first class citizen and maybe introduce a standard like [dots][dots].

[dots]: https://github.com/Ceasar/dots

What if it was also wise about your OS package managers (e.g. integrated with `apt-get`, `rpm`, `brew`). Meh, this is probably overkill but leads into a good point about a plugin system for easy extensibility of commands.

What if we dynamically picked up settings changes? No more `source ~/.bashrc` every change (another [Sublime Text][subl]).

[subl]: http://sublimetext.com/

```bash
dsh install sexy-prompt # Installs sexy-bash-prompt
dsh install twolfson-dotfiles # Installs collection of multiple packages (e.g. twolfson-dotfiles-dir-aliases)
dsh alias alert echo # Adds `alert` as an alias to `echo` permanently
```
