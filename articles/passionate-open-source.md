{
  "title": "How to stay passionate about open source",
  "author": "Todd Wolfson",
  "date": "2015-11-07T14:35:58-0600",
  "keywords": "passion, open, source",
  "summary": "An overview of how I prevent burnout on open source."
}

Staying active in open source is a problem I see every now and then. It's a problem that I have experienced in the form of burn out.

This article is to serve as a brain dump for what I have learned over time.

# If you aren't passionate now, then you won't be passionate later
If you are thinking about building a project because you feel obligated (not because you want to), then it will likely become a nuisance rather than something enjoyable.

For example, I maintain a project called [spritesmith][] which helps easily create CSS sprites. Then, one day I decided to build a sibling project named [fontsmith][] for web fonts. Unfortunately, it was never something I wound up using and eventually, after enough issues and frustration, I decided to deprecate it.

https://github.com/Ensighten/grunt-spritesmith

https://github.com/twolfson/grunt-fontsmith

[spritesmith]: https://github.com/Ensighten/grunt-spritesmith
[fontsmith]: https://github.com/twolfson/grunt-fontsmith

# Keep things focused
The Unix Philosophy of "Do one thing and do it well" has helped an enormous amount with keeping feature size down and projects focused.

Anything that you build, you will need to maintain later. As a result, adding in unnecessary one-off features will lead to a feeling of constantly being overwhelmed later on.

For example, a common request in [spritesmith][] is to add in using `0` over `0px` and combine common CSS properties (e.g. `background-image`/`width`/`height`).However, as I explain in the issues, this is starting down the road of CSS minification. As a result, we left that complexity out of [spritesmith][] and requested people use a CSS minification tool after [spritesmith][].

https://github.com/twolfson/spritesheet-templates/issues/11

https://github.com/twolfson/spritesheet-templates/pull/43

# Be prepared for bugs/features
Don't lie to yourself, open source will take time. People will report bugs and request features so make sure that you will have time for it.

Maintaining open source isn't exactly a part time job but it's definitely not a vacation either. Bug reports will pop up at your least convenient moment and feature requests will pop up right before you were going to work on that brand new project.

Learn to handle these issues quickly and efficiently via tools like tests, friendly debugging errors, and developer friendly documentation (e.g. lots of examples).

# Empathize with users
On a similar note, issues should always be handled in an empathetic way. I try to always put myself in the end users shoes to deliver the best support experience.

// TODO: Maybe break down into 2 sections "Communication" and "Empathy"?

- Reply within 24 hours with an ETA of when I can look into the issue
    - I typically give myself 5 days padding. For example, on a Friday I will say "Thanks for the report! I will take a look at this the end of next weekend". On a Monday, I will say "by the end of this weekend".
    - If I am unable to handle the issue in a prompt fashion, then I communicate that. For example, "I am on vacation for the next 2 weeks. I will give you an ETA on when I can triage this when I get back."
        - We don't give a full ETA since something else even more important could pop up within the next 2 weeks
- Frequently communicate
    - If you are about to look into an issue, let the user know. For example, "I am taking a look at this issue now"
    - If you resolve the issue relies on something else, let the user know. For example, "We have found the source of the issue and reported it to <Link to repository>. <Link to issue>"
    - If you are unable to fully resolve the issue now, leave notes for your future self and the user. For example "I have successfully reproduced the issue. I'm currently out of time for now though. I will take a look at implementing a patch by the end of this weekend. Here are notes for my future self: Bullets outlining how to reproduce"
- Don't close issues on impulse
    - If someone is asking for a feature you consider "stupid"
        - Don't immediately close the issue with an unhelpful response, this will make them feel horrible
        - Take the time to continue the thread ans ask them "Can you explain your use case further?"
        - Don't imply that their feature is unnecessary by saying "Why do you want that feature when feature X exists?" You will be making assumptions about their setup. Sometimes you will be surprised and be able to relate
        - For example, in [spritesmith][] one day I got an issue about disabling sorting. My initial reaction was "Why would you want that?" but as it turned out, the user was using it for animation sprites. As a result, we built a feature to disable sorting of sprites.
            - TODO: Find issue and link to it
    - If someone is asking about a duplicate issue, take the time to write out an example for their use case and link them to the existing issue.
        - They will be grateful, you might catch an edge case in their setup, and you have yet another example to point to when someone is having trouble

# Don't overwork yourself
If you feel like you are doing too much, then you probably are. Always give yourself time to relax and de-stress from other parts of your life. This is typically why I will give padded time estimates (e.g. "next weekend" for a Friday, "by the end of the weekend" for Monday).

Also, don't forget that you aren't an island. Feel free to invite people who submit good PRs as collaborators and mark issues with "help-wanted" if they are too much work for now.

# Don't forget why you started
Sometimes when you are in the thick of everything, it's hard to remember why you started doing something.

Every now and then, I need to remind myself of why I do open source in the first place.

TODO: Link to "Why I do open source" article

TODO: Maybe make this a "Related article" instead

**Sources:**

TODO: Linkify these

- indexzero Open source like a boss
- stubbornella Don't feed the trolls
- isz Something somewhere about empathy
- 3 years personal experience
