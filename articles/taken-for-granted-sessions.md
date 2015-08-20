{
  "title": "Taken for granted: Sessions",
  "author": "Todd Wolfson",
  "date": "2015-08-20T01:09:24-0500",
  "keywords": "taken for granted, sessions, protip",
  "summary": "There are some &quot;a-ha&quot; moments on the road to becoming a better developer. This article visits one of mine, sessions."
}

When I first started needing to maintain user state (e.g. user is logged in), I had trouble figuring out sessions. This article explains the best way to think about sessions.

In a typical server-side application (e.g. PHP, node.js, Ruby, Python), we manage sessions via cookies. A common secure variety is a cookie that is uniquely attached to a browser session

Bonus: CSRF
