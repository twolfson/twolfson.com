# Analytics vendor selection
## Comparison
|        Vendor        |                                                                                                 Notes                                                                                                 |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Cabin][]            | Strange carbon focus for analytics, but it does have privacy focus + free tier                                                                                                                        |
| [Counter][]          | Privacy friendly + aggregation focused + pay-what-you-want. I get nervous around longevity of these services sadly =/                                                                                 |
| [Google Analytics][] | Well established vendor, captures things well                                                                                                                                                         |
| [Heap][]             | Great resource for product analysis but overkill for a personal website                                                                                                                               |
| [Mixpanel][]         | Good for individual analysis, but that feels icky privacy-wise (esp with GDPR)                                                                                                                        |
| [Fathom Analytics][] | Sadly good but more expensive than Simple Analytics                                                                                                                                                   |
| No analytics         | It's an option, but I do like seeing website traffic + page popularity                                                                                                                                |
| [Plausible][]        | Comparable to Simple Analytics (even $9-ish/mo), but raises concerns around no jumping between pages data -- I guess could [use UTM codes + referrers][simple-collect]                                |
| [Simple Analytics][] | Sounds great with public data, but no free tier (cheapest $9/mo). Also really appreciate being an [open company][simple-open]. Found via [Lawnchair launcher's public analytics][lawnchair-analytics] |

[Cabin]: https://withcabin.com/
[Counter]: https://counter.dev/
[Fathom Analytics]: https://usefathom.com/
[Google Analytics]: https://analytics.google.com/analytics/web/
[Heap]: https://www.heap.io/
[Mixpanel]: https://mixpanel.com/
[Plausible]: https://plausible.io/
[Simple Analytics]: https://www.simpleanalytics.com/
[lawnchair-analytics]: https://simpleanalytics.com/lawnchair.app
[simple-collect]: https://docs.simpleanalytics.com/what-we-collect
[simple-open]: https://simpleanalytics.com/open

## Processing notes
### 2023-06-03
Google Analytics was our default choice when setting up this site. It was the most reputable option and easy to stand up.

[Google Analytics is shutting down their Universal Analytics solution][ga-switch] with Google Analytics 4, and instead of just jumping between solutions, I feel it's time to make intentional choices around vendors.

[ga-switch]: https://support.google.com/analytics/answer/10759417

...
After searching through existing starters (GA, Mixpanel, Simple Analytics), starting to dig into a search for "web analytics privacy first"

Some interesting problems + solutions for dealing with no cookies
