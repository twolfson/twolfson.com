{
  "title": "Minimizing merge conflicts",
  "author": "Todd Wolfson",
  "date": "2015-08-06T01:31:17-0500",
  "keywords": "merge, conflict, git, rebase, historical",
  "summary": "A `git` workflow that minimizes merge conflicts"
}

Out of the box using `git rebase`, `git commit --amend`, or `git merge --squash` can lead to frustrating scenarios;

- `git rebase` can lead to repetitive merge conflicts
    - `git rerere` can ease this pain but doesn't remove it entirely
    - If we want to build a branch on top of Our squashed commit may conflict with past versions of itself
