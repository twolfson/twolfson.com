{
  "title": "How to build an interactive dancefloor, theoretically",
  "author": "Todd Wolfson",
  "date": "2019-10-24T12:36:37-0500",
  "keywords": "art, electronics, prototype, dancefloor, burning man",
  "summary": "Explanation of dancefloor prototype for [Cone Down](https://twolfson.com/2019-10-24-cone-down)"
}

As part of building [Cone Down][], one of the features for our dancefloor was to make it interactive. We went with pressure sensitivity, built a prototype, but ran into 2 snags that stopped us:

- We ran out of time (e.g. assembly, debugging)
- Dancefloor polycarbonate cover warped under heat (discovered at Burning Man) thus further iteration would be an even larger time sink

[Cone Down]: https://twolfson.com/2019-10-24-cone-down

Here's the final functional setup we used for our top-of-frame prototype (polycarbonate unmounted in photo):

![Prototype photo](/public/images/articles/how-to-build-an-interactive-dancefloor-theoretically/prototype.jpg)

![Dancefloor sensor layout](/public/images/articles/how-to-build-an-interactive-dancefloor-theoretically/dancefloor-sensor-layout.svg)

This is a layout for 1 of the 9 tiles dancefloor. Inside of each tile is a small 3x3 grid for supporting polycarbonate which can be bendy

The 4 sensors in place will detect the "+" sign shape for the dancefloor tile. We settled on this approach as it's much more economical than the full square which requires double the cost

Each sensor had a mounting tape square underneath to keep it in place. We used bumpons to distribute the load from the weight of the polycarbonate

Items used:

- Polycarbonate: 1/4" from [TAP Plastics](https://www.tapplastics.com/)
- Sensors: [Force sensitive resistor](https://www.sparkfun.com/products/9375)
- Mounting tape: https://www.amazon.com/Scotch-Indoor-Mounting-38-yards-110-MR/dp/B0015ZXEKC/
    - The mounting tape served double duty for keeping the polycarbonate in place
    - We'd recommend experimenting with a barrier between the mounting tape and the frame (e.g. double-sided tape) as we destroyed sensors while attempting to remove the tape
- Bumpons: https://www.amazon.com/gp/product/B000NG3Z0S/
- Arduino MEGA: https://store.arduino.cc/usa/mega-2560-r3
    - This ran Firmata to sample each sensor directly from [our fork of LXStudio](https://github.com/tracyscott/ConeDown)
    - Due to the high number of sensors, we wanted to keep wiring as simple as possible (e.g. no additional instructions to use a shift register or multiplexer)

Here's a high level rundown of our process:

- Considered many sensor types from [Adafruit][] and [SparkFun][] websites (e.g. light, sound, pressure, flex)
  [Adafruit]: https://www.adafruit.com/
  [SparkFun]: https://www.sparkfun.com/
- Went with force sensitive resistor as it
  - Doesn't break under heavy weights (e.g. accidental art car on platform)
  - Won't have light/sound transmission issues
  - Easy to wire up (only need power and ground)
  - In hindsight, we should have explored flat switch membranes but we had too little time when the suggestion came up
- Set up test with Arduino, force sensitive resistors (FSR), and 25' of cable round trip (dancefloor was 12'x12')
  ![Arduino and sensor test](/public/images/articles/how-to-build-an-interactive-dancefloor-theoretically/arduino-sensor-test.jpg)
- Iterated with FSR on small wooden box
  - Using FSR taped down didn't work
  - Added silicone charger cord on top of FSR to get focused pressure, this worked
  - Key is to have material which deforms earlier than polycarbonate
  - On a later date, we formalized this to a bumpon and verified it works once again
  ![Small tile with bumpon layout](/public/images/articles/how-to-build-an-interactive-dancefloor-theoretically/small-tile-with-bumpon.jpg)
- Made large scale prototype for 1 dancefloor tile
  - Sensors didn't stay in place with tape, also broke easily
  - Added mounting tape to bottom of sensors, worked great
  - Getting lots of false positives due to mounting tape oversticking polycarbonate at times
  - Explored a few configurations (e.g. corners of tile, bumpons next to sensors, caulked down polycarbonate)
    ![Prototype with sensors in corners](/public/images/articles/how-to-build-an-interactive-dancefloor-theoretically/prototype-with-sensors-in-corners.jpg)
    ![Sensor with bumpons adjacent](/public/images/articles/how-to-build-an-interactive-dancefloor-theoretically/sensor-with-bumpons-adjacent.jpg)
  - Concluded that ideal setup is: edges of inner 3x3 with bumpons next to sensors
    ![Final prototype](/public/images/articles/how-to-build-an-interactive-dancefloor-theoretically/prototype.jpg)
- Started building cables and bought sensors for on-playa installation but ran out of time
