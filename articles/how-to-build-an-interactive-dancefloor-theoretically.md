{
  "title": "How to build an interactive dancefloor, theoretically",
  "author": "Todd Wolfson",
  "date": "2019-10-24T12:36:37-0500",
  "keywords": "art, electronics, prototype, dancefloor, burning man",
  "summary": "Explanation of dancefloor prototype for [Cone Down](https://twolfson.com/2019-10-24-cone-down)"
}

As part of building [Cone Down][], one of the features for our dancefloor was to make it interactive. We went with pressure sensitivity, built a prototype, but ran into 2 snags that stopped us:

- We ran out of time (e.g. assembly, debugging)
- Dancefloor polycarbonate cover warped under heat (discovered at Burning Man) so securing solution needed iteration

[Cone Down]: https://twolfson.com/2019-10-24-cone-down

Here's the final setup we used for our table-like steel frame:

TODO: Include diagram of sensors and bumpons

Here's a high level rundown of our process:

- Considered many sensor types (Adafruit, Sparkfun listings)
    - Light, sound, pressure, flex
- Went with force sensitive resistor as it doesn't break
- In hindsight, should have explored flat switch membrances
- Set up Arduino with force sensitive resistors
- Taped resistors didn't work
- Added something on top of resistors to get focused pressure, this wound up being bumpon
- Made large scale prototype for 1 dancefloor tile (of 3x3 grid)
- Sensors didn't stay in place easily, also broke easily
- Added mounting tape to bottom, worked great
- Getting lots of false positives due to oversticking at times
- Explored a few configurations (e.g. corners, bumpons next to sensors)
- Got edges of inner 3x3 with bumpons next to sensors to be best
    - Sensor had mounting tape on bottom and bumpon on top
- Only bought 4 sensors for 3x3 so end result would be + configuration, not full illumination
- Also resolution wasn't great for sub-cells, only large tile
