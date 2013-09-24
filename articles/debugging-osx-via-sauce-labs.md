{
  "title": "Debugging OSX via Sauce Labs",
  "author": "Todd Wolfson",
  "date": "2013/09/24",
  "summary": "Using [Sauce Labs](LINK ME) to debug software on OSX."
}

> Disclaimer: My use case was fortunate to not require any `sudo` actions and all the software I needed was pre-installed.

This week, I got a [OSX specific ticket for grunt-spritesmith][ticket], my images to spritesheet/variables converter. Unfortunately, I develop on [Linux Mint][] and unlike [Windows][ievms] and [Linux][ubuntu], there are no free OSX virtual machines to run against. My options were:

- Buy OSX and use a VM
- Wait until I get my work computer
- Use a VM rental service like [MacinCloud][]
- Try something different

[ticket]:
[Linux Mint]:
[ievms]:
[ubuntu]:
[MacinCloud]: http://www.macincloud.com/

I went with "Try something different", registered a Free account with [Sauce Labs][], and fired up an Interactive Session for OSX + Google Chrome.

[Sauce Labs]:

I closed out of Chrome, navigated to Applications/Utilities/Terminal, and got my bearings.

I tried to install `brew` but it required `sudo` priveleges so I went without it.

I discovered that `git` and `node` were already installed. The last piece I needed was [PhantomJS][]. For this, I inspected the path, found a non-`sudo` directory, and installed `phantomjs` to that directory.

```bash
wget http://phantomjs.googlecode.com/files/phantomjs-1.9.2-macosx.zip
unzip phantomjs-1.9.2-macosx.zip
ln -s $PWD/phantomjs-1.9.2-macosx/bin/phantomjs $HOME/.virtualenvs/sauce/bin/phantomjs
```

![PhantomJS version screenshot]

[PhantomJS]:

After that, I cloned my repository, installed the node modules, and ran the test. I verified I caught the bug.

```bash
git clone https://github.com/twolfson/phantomjssmith
npm install
npm test
# Error: Command failed: 2013-09-24 01:52:34.353 phantomjs[571:f07] Critical failure: the LastResort font is unavailable.
# 2013-09-24 01:52:34.354 phantomjs[571:f07] Critical failure: the LastResort font is unavailable.
```

Then, I hacked up the code, found the bug, created a fixed branch on my computer, fetched/tested the branch inside of Sauce Labs, and verified the problem was resolved.

```bash
$ npm test
> phantomjssmith@0.1.5 test /home/travis/build/twolfson/phantomjssmith
> doubleshot --timeout 60000
․․․․․
5 tests complete (3 seconds)
```
