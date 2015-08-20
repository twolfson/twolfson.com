{
  "title": "Taken for granted: Sessions",
  "author": "Todd Wolfson",
  "date": "2015-08-20T01:09:24-0500",
  "keywords": "taken for granted, sessions, protip",
  "summary": "There are some &quot;a-ha&quot; moments on the road to becoming a better developer. This article visits one of mine, sessions."
}

When I first started needing to maintain user state (e.g. user is logged in), I had trouble figuring out sessions. This article explains the best way to think about sessions.

At a high level, there are 2 types of sessions:

- Browser sessions, which attach visitor both when they are anonymous and logged in to our product
- User sessions, which identifies the user so we can take actions on their behalf (e.g. only User A can User A's password)

Typically when people are say "session" in the context of an application/server, they are talking about browser sessions. If they are speaking in the context of an API or Service Oriented Architecture, then this is likely about user sessions.

When I was first learning about this, I was thinking about it from browser sessions.
