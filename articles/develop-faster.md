{
  "title": "Develop faster",
  "author": "Todd Wolfson",
  "date": "2013/07/27",
  "_summary": "Learn about my workflow for creating, developing, and publishing repos."
}

I want to share how I work and the tools I use so that others can learn from my workflow, for better or for worse.

# Starting a reeeeepo
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
- [grunt-init][] is used to create boilerplate files. I use a personalized template which includes a `CHANGELOG.md`, [twolfson/grunt-init-node][twolfson-init].

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

<script src="/public/images/articles/develop-livereload/player.js"></script>
<script src="/public/images/articles/develop-livereload/a_packed.js"></script>
<div id="exampleAnimation"></div>
<script>
    // Create the player, add its element, and start it.  There is no need to
    // wait for the player to load before adding its element.
</script>

If the restart is a blocking action, then I use [listen-spawn][] to perform the action from Sublime Text without leaving.

[listen-spawn]: https://github.com/twolfson/listen-spawn

If the project needs a browser refresh to see changes, then I use [python-livereload][] with the [Firefox extension][ff-livereload] to refresh the browser when files change.

[python-livereload]: https://github.com/lepture/python-livereload
[ff-livereload]: http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-

TODO: Screencast

If the browser refresh performs a blocking action, then I use [tiny-lr][] triggers a reload when it receives HTTP requests.

[tiny-lr]: https://github.com/mklabs/tiny-lr

If the browser refresh requires click actions afterwards (e.g. click to open a modal), then I do one of the following:

- Build the server with a sandbox page to run arbitrary JS and arbitrary controller on page reload
- Make a URL route to perform the action / display the state
- Hard code the action to occur on page reload during development

If a git command is improperly typed, I use [git help.autocorrect][git-autocorrect] (0.7 seconds for me) to automatically run the proper command.

[git-autocorrect]: http://linux.die.net/man/1/git-config

TODO: Screencast

## Performance enhancement
To manage my windows, I use [controlpad][] (Linux), [Spectacle][] (Mac), [WindowPad][] (Windows) to move them to common positions and between monitors. These are all attached to keyboard shortcuts. My common setup is:

| Key binding                       | Action                                                     |
| --------------------------------- | ---------------------------------------------------------- |
| ctrl + meta + alt + Left          | Move active window to left half of current screen          |
| ctrl + meta + alt + Right         | Move active window to right half of current screen         |
| ctrl + meta + alt + Up            | Move active window to maximize window                      |
| ctrl + meta + alt + Down          | Move active window to center window                        |
| ctrl + meta + alt + u             | Move active window to upper-left quarter of current screen |
| ctrl + meta + alt + i             | Move active window to upper half of current screen         |
| ctrl + meta + alt + o             | Move active window to upper-right half of current screen   |
| ctrl + meta + alt + j             | Move active window to lower-left half of current screen    |
| ctrl + meta + alt + k             | Move active window to lower half of current screen         |
| ctrl + meta + alt + l             | Move active window to lower-right half of current screen   |
| ctrl + alt + shift + Left         | Move active window to leftmost screen                      |
| ctrl + alt + shift + Right        | Move active window to rightmost screen                     |

[controlpad]: https://github.com/twolfson/controlpad
[Spectacle]: http://spectacleapp.com/
[WindowPad]: http://www.autohotkey.com/board/topic/19990-windowpad-window-moving-tool

In addition, I use 2 monitors to see all my information at a glance; this removes the bottleneck of switching between windows to test iterations.

To create files and directories, I use [QuickFileCreator][] in Sublime Text. The key feature being a searchable list of relevant directories.

[QuickFileCreator]: https://github.com/noklesta/SublimeQuickFileCreator

To move, rename, and duplicate files, I use [SideBarEnhancements][] in Sublime Text which adds the respective commands to my command palette (e.g. "File: Duplicate").

[SideBarEnhancements]: https://github.com/titoBouzout/SideBarEnhancements

To pre-emptively prevent errors, I use [SublimeLinter][] in Sublime Text which highlights dirty text and displays an error icon in the gutter.

[SublimeLinter]: https://github.com/SublimeLinter/SublimeLinter

To find definitions in large projects, I use [Find++][fpp]'s "Find: In Project" and "Find: In..." to switch between searching in specific folders or across the entire project.

[fpp]: https://github.com/twolfson/FindPlusPlus

To beautify minified code, I use [CodeFormatter][] in Sublime Text which supports multiple languages (e.g. `CSS`, `JS`) and works with temporary files.

[CodeFormatter]: https://github.com/akalongman/sublimetext-codeformatter

To see the files in the same directory as the current one, I use [SyncedSideBar][]'s "Side Bar: Reveal File".

[SyncedSideBar]: https://github.com/sobstel/SyncedSideBar

To clean up developer notes, I use [Find++][fpp]'s "Find: In Project" and "Find: In Open Files" to remove any stale `TODO`s or `console.log`s.

## Catch issues faster
To reduce the bottleneck of waiting for test results, projects are built as small modules. This reduces the size of each test suite, effectively shortening the testing time.

During development, I run test suites via [nodemon][] or a `--watch` parameter which allows me to see failing tests pop up as they happen.

TODO: Show test failing via --watch

If a bug is reported, I write a test against it to prevent them from happening again and reducing the manual testing bottleneck.

Visual testing (i.e. [perceptual diffs][pdiff]) allows for catching visual errors that humans can easily overlook (e.g. ordering, color change).

[pdiff]: https://github.com/bslatkin/dpxdt

Additionally, using perceptual diffs can prevents visual regressions during major refactors (e.g. changing templating languages).

TODO: Include perceptual diff image

# Publishing updates
For releasing, I use a fork of [git-extras][]'s [git-release][] that passes version to the pre-release/post-release hooks. The hooks perform the following:

[git-extras]: https://github.com/visionmedia/git-extras
[git-release]: https://github.com/twolfson/git-extras/blob/dev/personal.mix/bin/git-release

- If a `package.json` exists, update the [node][] package version
- If a `package.json` exists and there is a `build` script, run `npm run build` ([node][])
- If a `bower.json` exists, update [bower][]'s component version
- If a `component.json` exists, update [component][]'s component version
- If a `packages.json` exists, update the [Sublime PackageControl][pkg-ctrl] version and timestamp
- Tag the [git][] version (default behavior of `git-release`)
- If a `package.json` exists, run `npm publish` ([node][])

[node]: http://nodejs.org/
[bower]: http://bower.io/
[component]: https://github.com/component/component
[pkg-ctrl]: http://wbond.net/sublime_packages/package_control

For using the above git hooks, you can fork my [git-template-dir][] in my [dotfiles][].

[git-template-dir]: https://github.com/twolfson/dotfiles/tree/master/git-template-dir
[dotfiles]: https://github.com/twolfson/dotfiles

The benefits of using `git-release` also include: reduced cost for publishing new release, prevent forgetting to run a command.

On projects that require squashed commits, I work on a historical branch (e.g. `dev/how.i.dev`) then [git-sqwish][] to a `squashed` branch (e.g. `dev/how.i.dev.squashed`). [git-sqwish][] is a command in my fork of [git-extras][] that was rejected in a PR. It performs the following:

[git-sqwish]: https://github.com/twolfson/git-extras/blob/dev/personal.mix/bin/git-sqwish

- Assert current branch is up to date with `master`
- Delete branch named `current branch + '.squashed'`
- Checkout `master` to `current branch + '.squashed'`
- Copy all files from `currenct branch` to `current branch + '.squashed'`
- Commit file changes in one commit

This has the same result as `git rebase -i` with the bonus of:

- You can use `git-merge` in your historical branch
- 1 merge conflict per `git-pull` (due to using `git-merge` over `git-rebase`)

# Excess information

My laptop is a Lenovo W520.

My operating system is Linux Mint 14.

My browser of choice is Firefox with Firebug as my development tools.

For the recordings in this post I used [rprichard's x11-canvas-screencast][x11-screencast].

[x11-screencast]: https://github.com/rprichard/x11-canvas-screencast
