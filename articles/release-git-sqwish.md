{
  "title": "Release: git sqwish",
  "author": "Todd Wolfson",
  "date": "Wed Oct 16 2013 00:00:00",
  "keywords": "git squash, git sqwish, rebase, merge conflict, rerere",
  "summary": "git squash without repetitive conflicts."
}

Introducing [git-sqwish][], a `git squash` without repetitive merge conflicts.

It is intended to alter your workflow; shifting from `git rebase` and `git rebase -i` to `git merge` and `git sqwish`.

The result is **a single merge conflict set** to deal with each time you sync rather than **1 set per commit**.

![Screenshot of git-sqwish workflow](/public/images/articles/git-sqwish.png)

More information can be found in the [GitHub repository][git-sqwish].

[git-sqwish]: https://github.com/twolfson/git-sqwish