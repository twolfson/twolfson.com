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
I dislike unnecessary tedium; anything to reduce the time it takes to test a new iteration is appreciated.

I stick to tools that have `watch` or `hook` functionality so that human actions are not the bottleneck of testing an iteration.

If the project has a build chain (e.g. minify JS, build CSS), then I place those tasks into a [Gruntfile][] and behind a [watch task][watch] to run the task when files change.

[Gruntfile]:
[watch]:

If the project needs to be restarted to pick up changes, then I use [nodemon][] to restart the server when files change.

[nodemon]:

If the restart is a blocking action, then I use [listen-spawn][] to perform the action from Sublime Text without leaving.

[listen-spawn]:

If the project needs a browser refresh to see changes, then I use [livereload][] with the [Firefox extension][ff-livereload] to refresh the browser when files change.

[livereload]:
[ff-livereload]:

If the browser refresh performs a blocking action, then I use [tiny-lr][] triggers a reload when it is receives HTTP requests.

[tiny-lr]:

If the browser refresh requires click actions afterwards (e.g. click to open a modal), then I build the server with a sandbox page to run arbitrary JS on page reload, I make a URL route to perform the action, or hard code the change temporarily.

If a git command is improperly typed, I use [git autohelp][autohelp] (.7 seconds for me) to automatically run the proper command.

[autohelp]:

TODO: controlpad/spectacles/windowpad, SideBarEnhancements, QuickFileCreator, Find++

# Publishing updates
TODO: git-release, dotfiles

# Maintaining repos
TODO: Tests (code and perceptual)

# Excess information

My laptop is a Lenovo W520.

My operating system is Linux Mint 14.

My browser of choice is Firefox with Firebug as my development tools.

For the recordings in this post I used [rprichard's x11-canvas-screencast][x11-screencast].

[x11-screencast]: https://github.com/rprichard/x11-canvas-screencast