{
  "title": "Taken for granted: Sessions",
  "author": "Todd Wolfson",
  "date": "2015-08-20T01:09:24-0500",
  "keywords": "taken for granted, sessions, protip",
  "summary": "There are some &quot;a-ha&quot; moments on the road to becoming a better developer. This article visits one of mine, sessions."
}

When I first started needing to maintain user state (e.g. user is logged in), I had trouble figuring out sessions. This article explains the best way to think about sessions.

At a high level, there are 2 types of sessions:

- Browser sessions, which store visitor data when they are on our site (regardless of being logged in/not)
- User sessions, which identifies a user so we can take actions on their behalf (e.g. only User A can update User A's password)

# Browser sessions
To keep the discussion focused on concepts rather than implementation, we will be discussing examples with respect to a server side application (e.g. PHP, node.js, Ruby, Python). The concepts are similar for browser side applications but we will discuss those afterwards.

TODO: Cookie JSON sessions
TODO: CSRF
TODO: Browser side application parallels (e.g. JWT)
