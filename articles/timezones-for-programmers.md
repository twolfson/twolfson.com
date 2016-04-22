{
  "title": "Timezones for programmers",
  "author": "Todd Wolfson",
  "date": "2016-04-22T01:49:06-0500",
  "keywords": "timezones, programmers",
  "summary": "Explanation of how to handle timezones as a programmer."
}

Until recently, I always thought I had a decent grip on timezones. It turns out, my previous assumptions were decent but not practical.

My assumptions were:

- Saving/using a numerical timezone offset (e.g. `-0600`) is "good enough"
- JavaScript wasn't great at dates but it was better than most since it had the `Date` primitive
