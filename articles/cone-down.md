{
  "title": "Cone Down",
  "author": "Todd Wolfson",
  "date": "2019-10-24T02:15:39-0500",
  "keywords": "art, electronics, construction, burning man",
  "summary": "Quick rundown of construction of a giant upside down ice cream cone for Burning Man"
}

This year at Burning Man, I helped build another giant art piece with the same team as [Rainbow Bridge][]. This time it was a giant upside down ice cream cone named [Cone Down][]

[Rainbow Bridge]: https://twolfson.com/2018-10-12-rainbow-bridge
[Cone Down]: https://www.lookingup.art/icecream

![Daytime photo of Cone Down](/public/images/articles/cone-down/daytime.jpg)

Attribution: https://www.instagram.com/p/B2unzxrhC2n/

![Nighttime photo of Cone Down](/public/images/articles/cone-down/nighttime.jpg)

Attribution: https://www.instagram.com/p/B2aAhEwHN7u/

Features included:

- Rope ladder to the top
- DJ booth at top
- Truss for aerialist performances
- Dancefloor with lighting and theoretically pressure sensitive tiles (prototype worked, didn't have time for full implementation)

![Features photo of Cone Down](/public/images/articles/cone-down/features.jpg)

Attribution: https://www.instagram.com/p/B2l5Vg-gxpz/

# Construction
Cone Down was built with a steel frame, layered like a cake

![Cone Down broken down by layers](/public/images/articles/cone-down/split-layers.jpg)

Each layer had either 8 or 16 panels where a lightbox would be mounted via bolts through tabs

![Annotated steel frame for tabs](/public/images/articles/cone-down/panel-tabs.jpg)

For the dancefloor, we laid the lightboxes on the ground and placed the frame on top of it. The dancefloor had a layer of clear polycarbonate on top of the frame

Each lightbox is an aluminum sheet with LEDs directly mounted via mounting tape and corrugated plastic for its sides and/or top (depends on panel location)

![Annotated panel with LEDs](/public/images/articles/cone-down/panel-with-leds.jpg)

![Annotated lightbox](/public/images/articles/cone-down/lightbox.jpg)

These panels were wired with IP68 connectors then ran along the frame where they'd be met by [power supplies][] for power injection and [PixLite long range receivers][] at the base

These were connected to a central [spider box][] (with some power splitters in between), [PixLite][], and computer. Our power source was a [14kW generator][]

We had 5939 LEDs total, 5498 on the cone (3544 in the cone, 1154 in the scoop) and 441 in the dancefloor. Here's our breakdown by panel variant:

```
# Cone
16*56 + 16*50 + 8*27 + 8*72 + 16*66

# Scoop
#   Lots of distinct variants due to slanted base
16*4 + 16*9 + 2*39 + 8*49 + 2*47 + 2*39 + 2*35 + 2*18 + 2*36 + 2*30 + 2*24 + 2*9

# Dancefloor
9*49
```

[power supplies]: https://www.mouser.com/ProductDetail/MEAN-WELL/LRS-350-12
[PixLite long range receivers]: https://www.advateklights.com/shop/pixlite-pixel-mapping/42-pixlite-16-controller.html
[PixLite]: https://www.advateklights.com/shop/home/51-pixlite-16-long-range-mkii.html
[spider box]: http://www.southwiretools.com/tools/tools/19763R02
[14kW generator]: https://www.multiquip.com/multiquip/pdfs/DCA15SPXU4F_Data_Sheet_292333.pdf

My role in this project was being 1 of the 3 EE (electrical engineering) co-leads. My tasks varied from panel fabrication (most time consuming) to layout/length calculations to interactive dancefloor prototyping.

# Word of warning
We ran into a bunch of electrical issues due to numerous reasons:

- LED/cable manufacturer used inconsistent polarities (i.e. in 2 pin power injection, left was power for cables whereas LEDs used right for power)
- IP68 connector used soft plastic, causing easy improper connection
- Didn't catch early due to lack of time for integration testing

In the future, I'll definitely be proactive in testing everything early, often, and with plenty of delegation for diversity in testing

# Links
- Organization behind Cone Down: https://www.lookingup.art/
- Cone Down Facebook: https://www.facebook.com/ConeDown/
