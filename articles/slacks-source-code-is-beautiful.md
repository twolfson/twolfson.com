{
  "title": "Slack's source code is beautiful",
  "urlOverride": "/2015-07-31-slacks-source-code-is-beautiful",
  "author": "Todd Wolfson",
  "date": "2015-07-31T01:18:06-0500",
  "keywords": "slack, source, browser, obfuscated",
  "summary": "A salute to the open and hackable source code of Slack's web client."
}

Slack's browser source code is transparent and easy to comprehend, making it super hackable.

Guess what the following snippet does:

```js
// Taken from http://viewsource.in/https://slack.global.ssl.fastly.net/31971/js/rollup-client_1420067921.js#L6413-6419
TS.channels.unread_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.channels.unread_highlight_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.groups.unread_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.groups.unread_highlight_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.ims.unread_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.ims.unread_highlight_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.client.login_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
```

Scroll down to see answer...

&darr;

&darr;

&darr;

&darr;

&darr;

&darr;

&darr;

If you guessed [Publish/subscribe pattern][], [EventEmitter][], or [Observer pattern][], then you are correct! These are communication channels to inform other parts of the application when a notification update occurs (e.g. new message received).

[Publish/subscribe pattern]: https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern
[EventEmitter]: https://nodejs.org/api/events.html#events_class_events_eventemitter
[Observer pattern]: https://en.wikipedia.org/wiki/Observer_pattern

Want to read more? Take a glance here:

http://viewsource.in/https://slack.global.ssl.fastly.net/31971/js/rollup-client_1420067921.js

http://viewsource.in/https://slack.global.ssl.fastly.net/31913/js/rollup-core_required_1419975817.js

# Explanation
I started using [plaidchat][] since Slack currently has no GNU/Linux Slack client. Not too far into using it, I wanted to add notification support and so began the dive into Slack's source code. When I started reading the code, I was surprised at how easy it was to read and integrate with, which is atypical from my experience (I used to do this professionally).

[plaidchat]: https://github.com/plaidchat/plaidchat

# What else do you use from Slack?
Currently, we integrate with [Slack's notification system][notifications], ["Switch team" links][team-links], ["Quick switcher"][quick-switcher], and [team data][team-data].

https://github.com/plaidchat/plaidchat/blob/v2.11.0/app/components/slack-window.js

[notifications]: https://github.com/plaidchat/plaidchat/blob/v2.11.0/app/components/slack-window.js#L16-L36
[team-links]: https://github.com/plaidchat/plaidchat/blob/v2.11.0/app/components/slack-window.js#L58-L72
[quick-switcher]: https://github.com/plaidchat/plaidchat/pull/120/files
[team-data]: https://github.com/plaidchat/plaidchat/blob/v2.11.0/app/components/slack-window.js#L160-L175

During a recent dive, we discovered `window.TSSSB` which is the actual bridge where Slack does its connections for its Windows and OS X clients. Since it's a lot cleaner to perform this integration, we might transition off of these hacks to our own `window.TSSSB` definitions.

https://github.com/plaidchat/plaidchat/issues/121

# Reading source code intimidates me
Don't feel intimidated. Most of the time, the source code of websites is awful to read; minified, obfuscated, and with horrible control structures.

As with most things, this takes time and practice. I have been reading source code since I got my hands on Firefox 3.0 and got very well practiced in my time at [Ensighten][].

For example: try visiting a JavaScript heavy ecommerce site, looking at the source code, and finding existing JavaScript hooks exist to track an "Add to cart" click (typical use case for analytics).

[Ensighten]: https://www.ensighten.com/

# Further reading/tools

If you are interested in more about reading source code, here are some resources:

- [JavaScript: The Definitive Guide][js-definitive-guide] - If you are going to read how something works, be sure to understand its underlying concepts
- [10 Things I Learned From the jQuery Source by Paul Irish][jquery-source] - Great tutorial on neat things from jQuery but also gets you reading someone else's code
- Lots of practice

[js-definitive-guide]: http://www.amazon.com/JavaScript-Definitive-Guide-David-Flanagan/dp/0596000480
[jquery-source]: http://www.paulirish.com/2010/10-things-i-learned-from-the-jquery-source/

Additionally, there are tools that can make your life easier:

- [jsbeautifier.org][] - Beautifies minified/obfuscated JavaScript code
- [beautify-with-words][] - Renames obfuscated JavaScript variables to something more reusable
- [esformatter-phonetic][] - Esformatter plugin with same purpose as [beautify-with-words][]
- [esformatter-rename][] - Esformatter plugin that renames variables via a mapping

[jsbeautifier.org]: http://jsbeautifier.org/
[beautify-with-words]: https://github.com/zertosh/beautify-with-words
[esformatter-phonetic]: https://github.com/twolfson/esformatter-phonetic
[esformatter-rename]: https://github.com/twolfson/esformatter-rename
