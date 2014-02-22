{
  "title": "UNLICENSE all the things",
  "author": "Todd Wolfson",
  "date": "2013/11/25",
  "keywords": "unlicense, license, legal, copyright, copyleft",
  "summary": "Choosing [UNLICENSE](http://unlicense.org/) over other licenses",
  "relatedArticles": ["Why I open source"]
}

The [UNLICENSE][] is a short, sweet, and respectable license (or lack there of).

[UNLICENSE]: http://unlicense.org/

When I started open source, I used the [MIT][] license because that was what everyone else was using. At a glance, the [MIT][] license is short and understandable.

[MIT]: http://choosealicense.com/licenses/mit/

I began to question things after [a talk by Bryan Cantrill on Corporate Open Source][bryan-cantrill]. He dropped terms like [Copyleft][] and explaining why certain licenses are very hostile. I did my research on [MIT][] and found that it was still satisfying my wants.

[bryan-cantrill]: http://smartos.org/2012/07/27/corporate-open-source-anti-patterns-doing-it-wrong/
[Copyleft]: http://en.wikipedia.org/wiki/Copyleft

Some months later, I re-read the [MIT][] license and realized that it required attribution inside all forked repositories. I am not okay with this.

Following the same principles on [why I began open source][], the software I create should be entirely unrestricted. It belongs to the world, not me.

[why I began open source]: /2013-04-22-why-i-open-source

From this conclusion, I started to look for a license that suited my wants. I stuck around with the [MIT][] license for a few more months but eventually settled.

I narrowed my choices down to the most common public domain licenses:

- [WTFPL][] - Do What The Fuck You Want To Public License, commonly used on [140byt.es][]
- [CC0][] - Creative Commons 1.0 Universal, the license used by [gittip][]
- [UNLICENSE][] - The UNLICENSE, my current weapon of choice

[WTFPL]: http://www.wtfpl.net/
[140byt.es]: http://140byt.es/
[CC0]: http://creativecommons.org/publicdomain/zero/1.0/
[gittip]: https://github.com/gittip/www.gittip.com/blob/10.1.42/CONTRIBUTING.md

I did not choose [WTFPL][] because it was too informal and would not be well respected in court.

I did not choose [CC0][] because it was too verbose; I wanted a license that was short and I could understand.

I chose [UNLICENSE][] because it was short like the [MIT][] license and easily understood.

There was one major concern I had with the [UNLICENSE][]; it would not hold up in some jurisdictions. You cannot entirely waive your rights on a piece of software in some countries yet every article was vague about where/why. There is a [fallback clause in CC0][] about this (see #4). However, I trudged on and started making the switch.

[fallback clause in CC0]: http://creativecommons.org/publicdomain/zero/1.0/legalcode

A few months later, I decided to do my due diligence on the jurisdiction situation. I came up with it mostly being [Moral Rights][] on a piece of software.

[Moral Rights]: http://en.wikipedia.org/wiki/Moral_rights

http://en.wikipedia.org/wiki/Moral_rights#Table

After reading through the list, I decided that I would not lower myself to their legal level by adjusting the license.

> I contemplated releasing software anonymously to forego even these most basic rights. However, I consider that extreme at this current time.

If someone is concerned about my open source software, they can reach out to me and I can license it to them/guarantee I won't sue them over it.

At the time of writing, I have created/transitioned 23 repositories to [UNLICENSE][].
