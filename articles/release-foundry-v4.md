{
  "title": "Release: foundry v4",
  "author": "Todd Wolfson",
  "date": "2015-10-17T17:58:41-0500",
  "keywords": "foundry, release",
  "summary": "An overview of our next iteration of [foundry](https://github.com/twolfson/foundry), a modular release library."
}

# Preface
Releases are a brittle and sensitive process. There are often a lot of steps involved:

1. Update CHANGELOG
2. Commit CHANGELOG (e.g. `git commit`)
3. Update semver in repository files (e.g. `package.json`, `setup.py`)
4. Commit semver changes (e.g. `git commit`)
5. Tag release commit (e.g. `git tag 1.0.0`)
6. Push committed versions (e.g. `git push`)
7. Push committed tags (e.g. `git push --tags`)
8. Publish to repository (e.g. `npm publish`, `python setup.py sdist --formats=gztar,zip upload`)

If we forget any step, then we usually might need to start all over. Or if we notice a typo in our documentation, we might need to perform another `patch` release.

For a while, I have been trying to automate this as much as possible:

Initially via an integration with `git-extras' release` command:

- https://github.com/tj/git-extras
- https://github.com/twolfson/dotfiles/blob/0.29.0/git-template-dir/hooks/post-release.sh

Then, with `foundry` as a plugin based release command:

- https://github.com/twolfson/foundry/tree/3.1.0

# Synopsis
For the uninformed, here is some necessary background information. We break down a release into 4 steps:

1. Update files, update package files with the new version and changes (e.g. update `package.json`, add to `CHANGELOG.md`)
2. Commit, persist any changes to a version control system (e.g. `git commit && git tag`)
3. Register, if the package is new (e.g. semver === `1.0.0`), then register it to its repository (e.g. `python setup.py register`)
4. Publish, release changes to package's repository (e.g. `npm publish`)

# Release v4
The past revisions of `foundry` have had a few problems which bugged me:

- Releases were not transparent (e.g. we didn't know what command would fail without looking at source code)
- If a local `foundry` isn't found, then the global one will be used automatically
- If a release fails (e.g. forgot to log in to `npm`, repository is randomly sending 500's), then there is no easy way to resume
- No support for custom commands (e.g. we can't throw in a `./build.sh` when updating files
- Language exclusive (e.g. PyPI release command is written in JavaScript, not Python so we can't leverage its AST)

To resolve this, we took the following approach:

- Moved to CLI based commands rather than plugins
    - Allows specification to be cross-language
    - Opens avenue for writing custom commands in configuration
    - Allows for transparent execution of each step since we own the CLI invocation
- Moved to deterministic release steps
    - Allows for resuming failed releases
- Moved to current working directory `package.json`/`.foundryrc` for release configuration
    - Removes possibility of running global `foundry`
    - Allows for customization of things like `registerVersion` (semver to run "register" steps at)

# Results
These changes are all now live in `foundry`.

We revamped `foundry-release-spec` to integration with CLIs:

- Before: https://github.com/twolfson/foundry-release-spec/tree/1.1.0
- After: https://github.com/twolfson/foundry-release-spec/tree/2.0.0

We wrote a `foundry-release-base` to easily migrate our plugins to command integrations:

https://github.com/twolfson/foundry-release-base/tree/1.0.2

Upon failure, `foundry release` will generate a `foundry-resume.json`. This allows for usage of `foundry resume` which picks up the release from where it last failed. As a result, we can retry publishing to a flaky repository (e.g. occasional 500's).

We added support for `customCommand` as part of our `releaseCommands`. This allows for custom one-off commands (e.g. `update-files: 'npm run build'`).

Lastly, we added more transparent output so we always know exactly where we are in our release:

TODO: Add screenshot.
