{
  "title": "How to stay passionate about open source",
  "author": "Todd Wolfson",
  "date": "2015-10-17T17:58:41-0500",
  "keywords": "passion, open, source",
  "summary": "As with any TODO"
}

Staying active in open source is a problem I see every now and then. It's a problem that I have experienced in the form of burn out.

This article is to serve as a brain dump for what I have learned over time.

# If you aren't passionate now, then you won't be passionate later
If you are thinking about building a project because you feel obligated (not because you want to), then it will likely sink. When you get an issue about a new feature, then you will be aggravated about implementing it.

For example, I maintain a project called [spritesmith][] which helps easily create CSS sprites. Then, one day I decided to build a sibling project named [fontsmith][] for web fonts. Unfortunately, it was never something I wound up using and eventually, after enough issues, I decided to deprecate it.

https://github.com/Ensighten/grunt-spritesmith

https://github.com/twolfson/grunt-fontsmith

[spritesmith]: https://github.com/Ensighten/grunt-spritesmith
[fontsmith]: https://github.com/twolfson/grunt-fontsmith

# Keep things focused
The Unix Philosophy of "Do one thing and do it well" has helped an enormous amount with keeping feature size down and projects focused.

Something that a programmer should understand is that anything you build now, you will need to maintain later. As a result, adding in unnecessary one-off features will lead to a feeling of constantly being overwhelmed later on.

For example, a common request in [spritesmith][] is to add in using `0` over `0px` for sprite positions, combine rules which use the same `background-image` or `width`/`height`. However, as I explain in the issues, this is starting down the road of CSS minification. As a result, we should leave that complexity out of [spritesmith][] and request people use a CSS minification tool after [spritesmith][].

https://github.com/twolfson/spritesheet-templates/issues/11

https://github.com/twolfson/spritesheet-templates/pull/43

# Be prepared for bugs/new features
Don't lie to yourself, open source will take time. People will report bugs, people will request features (some that belong, some that don't).

that do belong in your project, so make sure that you will have time for it. @indexzero once said that open source something to the extent to that open source is similar to taking care of a child. My interpretation of that would be, it's not nearly as bad since it's not a 100% time job. However, bug reports will pop up at your least convenient moment and feature requests will pop up right before you were going to work on that brand new project. Learn to handle these issues quickly and efficiently via tools like tests, friendly debugging errors, and developer friendly documentation (e.g. lots of examples).
- Mention about taking on collaborators
- Never force yourself to do anything you don't want to do. Instead, communicate how you feel (e.g. overwhelmed with other tasks at the moment, won't be able to take a look for 2 weeks [this is usually buffered by 1.5x]. Maybe the user will empathize.
- Set expectations quickly and always reply within a timely manner
    - You are the front line of support for your project
    - You know when you will be fre
- Empathy is frustrating but necessary
    - Is someone asking for a "stupid" feature? Before immediately closing that issue and making them feel like shit. Take a moment to continue to the thread asking them "Why do you want that feature?"
    - Don't insult them or demean them by saying "Why do you want that feature when feature X exists?" You are making assumptions about their setup. Sometimes you get surprised by their setup. One example from personal experience:
        -  I maintain [spritesmith][TODO: link] which was built as a tool for automatically building CSS sprites. One day, I got an issue about disabling sorting. My initial reaction was "Why would you want that?" but as it turned out, the user was using it for animation sprites. As a result, we built a feature to disable sorting of sprites.
            - TODO: Find issue and link to it
