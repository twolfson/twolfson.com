{
  "title": "Time zones for programmers",
  "author": "Todd Wolfson",
  "date": "2016-04-22T01:49:06-0500",
  "keywords": "time zones, programmers",
  "summary": "Explanation of how to handle time zones as a programmer."
}

Until recently, I always thought I had a decent grip on time zones. It turns out my previous assumptions were decent but not practical.

I thought:

- Saving/using a numerical time zone offset (e.g. `-0600`) is "good enough"
- JavaScript wasn't great at dates but it was better than most since it had the `Date` primitive

## Numerical offsets vs time zones
Time zones are typically based on geographical locations. For example, we have the [IANA time zone][] `America/Chicago` which can represent Central Time for the United States.

[IANA time zone]: https://www.iana.org/time-zones

Depending on the time of year, this will be a numerical offset of `-0500` or `-0600` from UTC. The change depends on the United States definition of [daylight saving time][].

[daylight saving time]: https://en.wikipedia.org/wiki/Daylight_saving_time

Unfortunately, a lot of regions can have the same offset (e.g. look North or South and you will have a different country with possibly different daylight saving time rules). As a result, we cannot save a datetime with a numerical offset without losing the IANA time zone.

In PostgreSQL, all datetime values are stored in UTC with no preservation of IANA time zone. As a result, we must save both the UTC value and the IANA time zone in 2 separate columns.

## JavaScript frustrations
In the current JavaScript implementation, there is support for numerical offsets but not for IANA timezones. Thankfully there are a few solutions:

- Guess based off of the user's IP address
- Guess based off of the browser's timezone offset
    - https://bitbucket.org/pellepim/jstimezonedetect
    - http://momentjs.com/timezone/docs/#/using-timezones/guessing-user-timezone/

Once we have the timezone, we recommend to stick to using `moment` with `moment-timezone` to prevent any loss of IANA time zone. This includes when saving/restoring from a database.

## Further reading
- [Computerphile - The Problem with Time & Timezones](https://www.youtube.com/watch?v=-5wpm-gesOY)
- [IANA time zone database](https://www.iana.org/time-zones)
