{
  "title": "A better shell",
  "author": "Todd Wolfson",
  "date": "2013/07/06",
  "_summary": "Thoughts on taking steps to make a better shell"
}

A coworker sent me a [harmless tweet][kr-tweet] about using [zsh][zsh] over [bash][bash]. This got me thinking about how "good" these shells are.

[kr-tweet]:
[zsh]:
[bash]:

The differences are default usability and plugins but the infrastructure for a fluid ecosystem is lacking (a la [Sublime Text][pkg-ctrl]).

[pkg-ctrl]:

What if there was a shell which was build for `dotfiles`? `dotfiles` as a first class citizen and maybe introduce a standard like [dots][dots].

[dots]:


What if it was also wise about your OS package managers (e.g. integrated with `apt-get`, `rpm`, `brew`). Meh, this is probably overkill but leads into a good point about a plugin system for easy extensibility of commands.

What if we dynamically picked up settings changed ([Sublime Text][subl] again)? No more `source ~/.bashrc` every change.

[subl]:

```sh
dsh install sexy-prompt # Installs sexy-bash-prompt
dsh install twolfson-dotfiles # Installs collection of multiple packages (e.g. twolfson-dotfiles-dir-aliases)
dsh alias alert echo # Adds `alert` as an alias to `echo` permanently
```
