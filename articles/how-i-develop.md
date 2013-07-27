{
  "title": "How I Develop",
  "author": "Todd Wolfson",
  "date": "2013/07/27",
  "_summary": "Learn about my workflow for creating, developing, and publishing repos"
}

I want to share how I work and the tools I use so that others can learn from my workflow, for better or for worse.

# Starting a repo
I follow the open source first methodology when it comes to projects. This means from the very first commit, my repo has been published to GitHub.

I take the extra step of using a boilerplate to include a `LICENSE` for every repo.

```bash
$ # Initialize git repository
$ git init
Initialized empty Git repository in /home/todd/github/tmp-repo/.git/

$ # Create remote repository on GitHub
$ hub create
Updating origin
created repository: twolfson/tmp-repo

$ # Start from grunt-init-node boilerplate
$ grunt-init node
Running "init:node" (init) task
...
Please answer the following:
[?] Project name (tmp-repo)
...
Writing CHANGELOG.md...OK
Writing README.md...OK
...
Done, without errors.
```

TODO: Insert screencast

## Tools used

- [git][] is used for create a new [git][] repository
- [hub][] is used for remote repository management on [GitHub][gh]
- [grunt-init][] is used to create boilerplate files. I use a personalized template which includes a `CHANGELOG.md`, [twolfson/grunt-init-node][twolfson-init]

[git]: http://git-scm.com/
[hub]: https://github.com/defunkt/hub
[gh]: https://github.com/
[grunt-init]: https://github.com/gruntjs/grunt-init
[twolfson-init]: https://github.com/twolfson/grunt-init-node

# Developing on a repo
## Remove bottlenecks
I dislike unnecessary tedium; anything to reduce the time it takes to test a new iteration is appreciated.

I stick to tools that have `watch` or `hook` functionality so that human actions are not the bottleneck of testing an iteration.

If the project has a build chain (e.g. minify JS, build CSS), then I place those tasks into a [Gruntfile][grunt] and behind a [watch task][watch] to run the task when files change.

[grunt]: http://gruntjs.com/
[watch]: https://github.com/gruntjs/grunt-contrib-watch

If the project needs to be restarted to pick up changes, then I use [nodemon][] to restart the server when files change.

[nodemon]: https://github.com/remy/nodemon

If the restart is a blocking action, then I use [listen-spawn][] to perform the action from Sublime Text without leaving.

[listen-spawn]: https://github.com/twolfson/listen-spawn

If the project needs a browser refresh to see changes, then I use [python-livereload][] with the [Firefox extension][ff-livereload] to refresh the browser when files change.

[python-livereload]: https://github.com/lepture/python-livereload
[ff-livereload]: http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-

If the browser refresh performs a blocking action, then I use [tiny-lr][] triggers a reload when it receives HTTP requests.

[tiny-lr]: https://github.com/mklabs/tiny-lr

If the browser refresh requires click actions afterwards (e.g. click to open a modal), then I build the server with a sandbox page to run arbitrary JS on page reload, I make a URL route to perform the action, or hard code the change temporarily.

If a git command is improperly typed, I use [git help.autocorrect][git-autocorrect] (.7 seconds for me) to automatically run the proper command.

[git-autocorrect]: http://linux.die.net/man/1/git-config

## Performance enhancement
To manage my windows, I use [controlpad][] (Linux), [Spectacles][] (Mac), [WindowPad][] (Windows) to move them to common positions and between monitors.

In addition, I use 2 monitors to see all my information at a glance; this removes the bottleneck of switching between windows to test iterations.

To create files and directories, I use [QuickFileCreator][] in Sublime Text. The key feature being a searchable list of relevant directories.

To move, rename, and duplicate files, I use [SideBarEnhancements][] in Sublime Text which adds the respective commands to my command palette (e.g. "File: Duplicate").

To pre-emptively prevent errors, I use [SublimeLinter][] in Sublime Text which highlights dirty text and displays an error icon in the gutter.

To find definitions in large projects, I use [Find++][fpp]'s "Find: In Project" and "Find: In..." to switch between searching in specific folders or across the entire project.

To beautify minified code, I use [CodeFormatter][] in Sublime Text which supports multiple languages (e.g. `CSS`, `JS`) and works with temporary files.

To see the files in the same directory as the current one, I use [SyncedSideBar][]'s "Side Bar: Reveal File".

## Catch issues faster
TODO: Tests (code and perceptual)

# Publishing updates
TODO: git-release, dotfiles

# Excess information

My laptop is a Lenovo W520.

My operating system is Linux Mint 14.

My browser of choice is Firefox with Firebug as my development tools.

For the recordings in this post I used [rprichard's x11-canvas-screencast][x11-screencast].

[x11-screencast]: https://github.com/rprichard/x11-canvas-screencast