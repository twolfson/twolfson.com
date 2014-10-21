{
  "title": "Develop faster",
  "author": "Todd Wolfson",
  "date": "2013/07/27",
  "keywords": "develop faster, dev tools, efficiency, grunt, hub, nodemon, live-reload, git-extras",
  "summary": "Removing the tedium from creating, developing, and publishing repos.",
  "scripts": ["public/js/articles/develop-faster.js"],
  "relatedArticles": ["Release: git sqwish"]
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

<p id="init-screencast" class="screencast"></p>

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

<p id="grunt-screencast" class="screencast"></p>

[grunt]: http://gruntjs.com/
[watch]: https://github.com/gruntjs/grunt-contrib-watch

If the project needs to be restarted to pick up changes, then I use [nodemon][] to restart the server when files change.

[nodemon]: https://github.com/remy/nodemon

If the restart is a blocking action, then I use [listen-spawn][] to perform the action from Sublime Text without leaving.

[listen-spawn]: https://github.com/twolfson/listen-spawn

<p id="nodemon-screencast" class="screencast"></p>

If the project needs a browser refresh to see changes, then I use [python-livereload][] with the [Firefox extension][ff-livereload] to refresh the browser when files change.

[python-livereload]: https://github.com/lepture/python-livereload
[ff-livereload]: http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-

<p id="livereload-screencast" class="screencast"></p>

If the browser refresh performs a blocking action, then I use [tiny-lr][] triggers a reload when it receives HTTP requests.

[tiny-lr]: https://github.com/mklabs/tiny-lr

If the browser refresh requires click actions afterwards (e.g. click to open a modal), then I do one of the following:

- Build the server with a sandbox page to run arbitrary JS and arbitrary controller on page reload
- Make a URL route to perform the action / display the state
- Hard code the action to occur on page reload during development

If a git command is improperly typed, I use [git help.autocorrect][git-autocorrect] (0.7 seconds for me) to automatically run the proper command.

[git-autocorrect]: http://linux.die.net/man/1/git-config

```bash
$ git comit -m "Touched abc"
WARNING: You called a Git command named 'comit', which does not exist.
Continuing under the assumption that you meant 'commit'
in 0.7 seconds automatically...
[master 8b3f0f0] Touched abc
 0 files changed
 create mode 100644 abc
```

<p id="autocorrect-screencast" class="screencast"></p>

## Catch issues faster
To reduce the bottleneck of waiting for test results, projects are built as small modules. This reduces the size of each test suite, effectively shortening the testing time.

During development, I run test suites via [nodemon][] or a `--watch` parameter which allows me to see failing tests pop up as they happen.

<p id="watch-screencast" class="screencast"></p>

If a bug is reported, I write a test against it to prevent them from happening again and reducing the manual testing bottleneck.

Visual testing (i.e. [perceptual diffs][pdiff]) allows for catching visual errors that humans can easily overlook (e.g. ordering, color change).

[pdiff]: https://github.com/bslatkin/dpxdt

[![Perceptual diff][perceptual-diff-thumb]][perceptual-diff]

[perceptual-diff-thumb]: /public/images/articles/develop-faster/perceptual-diff.thumb.png
[perceptual-diff]: /public/images/articles/develop-faster/perceptual-diff.png

Additionally, using perceptual diffs can prevents visual regressions during major refactors (e.g. changing templating languages).

# Publishing updates
For releasing, I use a fork of [git-extras][]'s [git-release][] that passes version to the pre-release/post-release hooks. The hooks perform the following:

[git-extras]: https://github.com/tj/git-extras
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

```bash
$ git release 0.1.1
... pre-release
# npm run build
> css-controls@0.1.1 build /home/todd/github/css-controls
> browserify lib/css-controls.js --standalone css-controls --outfile dist/css-controls.js

... releasing 0.1.1
[master f200ecc] Release 0.1.1
...
To git@github.com:twolfson/css-controls.git
 * [new tag]         0.1.1 -> 0.1.1

... post-release
# npm publish
npm http PUT https://registry.npmjs.org/css-controls
...
+ css-controls@0.1.1

... complete
```

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

```bash
$ touch def
$ git add -A
$ git commit -m "Touched def"
[dev/touch.files daeabc7] Touched def
...
$ touch ghi
$ git add -A
$ git commit -m "Touched ghi"
[dev/touch.files 991ee10] Touched ghi
...
$ git sqwish master
Switched to a new branch 'dev/touch.files.squashed'
...
[dev/touch.files.squashed d9dd664] Touched ghi Touched def
 0 files changed
 create mode 100644 def
 create mode 100644 ghi
$ git log
commit d9dd664114a19dd57bbb37b70f9fcce8e7df60bd
Author: Todd Wolfson <todd@twolfson.com>
Date:   Sat Jul 27 16:12:26 2013 -0700

    Touched ghi
    Touched def
```

# Excess information

My laptop is a Lenovo W520.

My operating system is Linux Mint 14.

My browser of choice is Firefox with Firebug as my development tools.

For the recordings in this post I used [rprichard's x11-canvas-screencast][x11-screencast].

[x11-screencast]: https://github.com/rprichard/x11-canvas-screencast
