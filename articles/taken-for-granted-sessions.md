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
To keep the discussion focused on concepts, we will be discussing only 1 implementation with respect to server side applications (e.g. PHP, node.js, Ruby, Python). The concepts are similar for browser side and other server side applications but we will discuss those afterwards.

A common secure implementation uses the following steps:

- A user requests a page from our site (may be first page they are opening, may be second/third/etc)
    - For example, they are opening <http://google.com/>
    - Determine if this is the user's first request
    - If this is their first request
        - Generate a unique identifier for them
    - Otherwise (this is not their first request)
        - Verify that their identifier is legitimate
        - Fetch relevant information for their identifier
    - During the lifetime of the request (i.e. from when we receive it to when we send HTML content back)
        - Allow any modifications to information about the visitor (e.g. save the last time the loaded a page)
    - Depending on the implementation, these might save all changes at the end of the request or as the changes occur

Let's break down these steps 1 by 1.

**"Determine if this is the user's first request"** is handled via `cookies`. `cookies` are key/value pairs that are stored locally in the browser and sent to the server on every request.

To determine if this is the user's first request, we look for the key/value pair with the key for our identifier. For the purposes of this discussion, let's call that "session-id".

If don't see a "session-id", then we know this is their first request (as they are assigned a "session-id" on the first request).

**"If this is their first request, then generate a unique identifier for them"** We can generate a non-conflicting unique identifier for users via a few means (e.g. [UUID][], [/dev/urandom][]). Then, we will send back this information to the user as their "session-id".

[UUID]: https://en.wikipedia.org/wiki/Universally_unique_identifier
[/dev/urandom]: https://en.wikipedia.org/wiki//dev/randoms

> If you are worrying about parallel requests and multiple sessions being generated for a single user, then don't. The user will only be able to request the assets from the page (e.g. CSS, JS), after we reply with their updated `cookies`. It is possible for someone to spam us with fresh HTTP requests to generate lot of sessions (known as a denial of service attack) but technology for sessions typically stands up to that.



TODO: Cookie JSON sessions
TODO: CSRF
TODO: HMAC
TODO: Browser side application parallels (e.g. JWT)
