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