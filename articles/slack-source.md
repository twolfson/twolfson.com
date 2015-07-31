{
  "title": "Slack's source code is beautiful",
  "author": "Todd Wolfson",
  "date": "2015-07-31T01:18:06-0500",
  "keywords": "slack, source, browser, obfuscated",
  "summary": "A salute to the open and hackable source code of Slack's web client."
}

Slack's browser source code is transparent and easy to comprehend, making it super hackable.

```js
// Guess what this does
TS.channels.unread_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.channels.unread_highlight_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.groups.unread_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.groups.unread_highlight_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.ims.unread_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.ims.unread_highlight_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.client.login_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
```

.

.

.

.

.

.

.

.
