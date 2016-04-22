{
  "title": "Timezones for programmers",
  "author": "Todd Wolfson",
  "date": "2016-04-22T01:49:06-0500",
  "keywords": "timezones, programmers",
  "summary": "Explanation of how to handle timezones as a programmer."
}

Until recently, I always thought I had a decent grip on timezones. It turns out my previous assumptions were reasonable but not practical. I thought:

- Saving/using a numerical timezone offset (e.g. `-0600`) was "good enough"
- JavaScript wasn't great at dates but it was better than most since it had the `Date` primitive

As it turns out: nope and nope.

## Numerical offsets vs timezones
Timezones are typically based on geographical locations. For example, we have the [IANA timezone][] `America/Chicago` which can represent Central Time for the United States.

[IANA timezone]: https://www.iana.org/time-zones

Depending on the time of year, this will be a numerical offset of `-0500` or `-0600` from UTC. The change depends on the United States definition of [daylight saving time][].

[daylight saving time]: https://en.wikipedia.org/wiki/Daylight_saving_time

Unfortunately, regions can share the same offset (e.g. another country North/South) so if we save/restore the data, then we won't know what country the original datetime corresponded to.

In most scenarios, this can be slipped under the rug but if you want to let users edit/update timezone aware datetimes, then it won't work.

In PostgreSQL, all datetime values are stored in UTC with no preservation of IANA timezone. As a result, we must save both the UTC value and the IANA timezone in 2 separate columns.

## JavaScript frustrations
In the current JavaScript implementation, there is support for numerical offsets but not for IANA timezones. Thankfully there are a few solutions:

- Guess based off of the user's IP address
- Guess based off of the browser's timezone offset
    - https://bitbucket.org/pellepim/jstimezonedetect
    - http://momentjs.com/timezone/docs/#/using-timezones/guessing-user-timezone/

Once we have the timezone, we recommend to stick to using `moment` with `moment-timezone` to prevent any loss of IANA timezone. This includes when saving/restoring from a database.

## Further reading
Here are some resources I found practical when reading up on timezones:

- [Computerphile - The Problem with Time & Timezones](https://www.youtube.com/watch?v=-5wpm-gesOY)
- [IANA timezone database](https://www.iana.org/time-zones)
