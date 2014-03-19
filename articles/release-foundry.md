{
  "title": "Release: foundry",
  "author": "Todd Wolfson",
  "date": "2014-03-19T02:11:46.684680-07:00",
  "keywords": "release, publish, foundry, npm, bower, component, pypi, git tag",
  "summary": "Release manager for [npm](http://npmjs.org/), [bower](http://bower.io/), [component](http://component.io/), [PyPI](http://pypi.python.org/), [git tags](http://git-scm.com/), and any plugin you can write"
}

[foundry][] is a plugin based release manager for [npm][], [bower][], [component][], [PyPI][], [git tags][], and any plugin you can write.

[foundry]: https://github.com/twolfson/foundry
[npm]: http://npmjs.org/
[bower]: http://bower.io/
[component]: http://component.io/
[PyPI]: http://pypi.python.org/
[git tags]: http://git-scm.com/

![Screenshot of foundry releasing foundry](/public/images/articles/release-foundry.png)

The existing release management solutions are either [dotfiles][dot-release] or an explicit set of repositories. Eventually, I was fed up not being able to share my setup with others without a complex set of instructions. Then, [foundry][] was born.

[dot-release]: https://github.com/twolfson/dotfiles/blob/0.29.0/git-template-dir/hooks/post-release.sh

This release includes plugins that I frequently use and have been dogfooding since the start of development

- [foundry-release-bower][], manages `version` in `bower.json`
- [foundry-release-component][], manages `version` in `component.json`
- [foundry-release-git][], runs `git tag` and `git commit` upon release
- [foundry-release-npm][], manages `version` in `package.json` and runs `npm publish` upon release
- [foundry-release-pypi][], manages `version` in `setup.py` and registers/zips/gzips package upon release
- An up-to-date list of all plugins can be found at https://www.npmjs.org/browse/keyword/foundry-release

[foundry-release-bower]: https://github.com/twolfson/foundry-release-bower
[foundry-release-component]: https://github.com/twolfson/foundry-release-component
[foundry-release-git]: https://github.com/twolfson/foundry-release-git
[foundry-release-npm]: https://github.com/twolfson/foundry-release-npm
[foundry-release-pypi]: https://github.com/twolfson/foundry-release-pypi

The [plugin specification][] can be found at: https://github.com/twolfson/foundry-release-spec

[plugin specification]: https://github.com/twolfson/foundry-release-spec

[foundry][] is available on [GitHub][]: https://github.com/twolfson/foundry

[GitHub]: http://github.com/

