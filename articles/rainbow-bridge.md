{
  "title": "Rainbow Bridge",
  "author": "Todd Wolfson",
  "date": "2018-10-12T18:40:46-0500",
  "keywords": "art, electronics, construction, burning man",
  "summary": "Story of how I helped build a giant rainbow at Burning Man"
}

This year I helped build a giant rainbow for and at Burning Man. It was 70' x 30' x 4', had 25,200 LEDs, was walkable, and had aerial performances

Under construction:

![Construction photo](/public/images/articles/rainbow-bridge/40095734_1710639739065692_6692400749088866304_n.jpg)

Attribution: https://www.facebook.com/TheRainbowBridgeProject/photos/a.1556837994445868/1710639725732360/

Daytime:

![Daytime photo](/public/images/articles/rainbow-bridge/42306101_290184961801299_3149557478864197898_n.jpg)

Attribution: https://www.instagram.com/p/BocI4BUFT71/

Aerial performance:

![Aerial performance](/public/images/articles/rainbow-bridge/40583624_712769255749003_3196954852134953032_n.jpg)

Attribution: https://www.instagram.com/p/Bngxc_CDtxh/

Nighttime:

![Nighttime photo](/public/images/articles/rainbow-bridge/43778758_296096544544453_2143317047685523622_n.jpg)

Attribution: https://www.instagram.com/p/BowpzghFU_7/

Here's some more high level details:

- 7 large trusses, acting as the backbone of the bridge (3 of 7 in this photo)
    - ![Trusses](/public/images/articles/rainbow-bridge/trusses.jpg)
    - Attribution: https://www.instagram.com/p/BmxXip0hp2d/
- 2 sets of footings to hold it up
    - ![Footings](/public/images/articles/rainbow-bridge/footings.jpg)
    - Attribution: https://www.facebook.com/TheRainbowBridgeProject/photos/a.1556837994445868/1708722955924037/
- 2 railing pieces per truss
    - See trusses photo above
- 4 panels per side of each railing
    - See construction photo at top
- 450 LEDs (9 50 LED strands) per panel
    - ![LED panels](/public/images/articles/rainbow-bridge/36705018_477236966052274_5892030668606537728_n.jpg)
    - Attribution: https://www.instagram.com/p/BlZiIu9ht7M/
- 3 days to pack everything onto a 53' flatbed and into large U-Haul (Thursday - Saturday)
- 2 days to drive to the desert (Sunday - Monday)
- 5 days to assemble and erect bridge (Monday - Friday)
- 4 more days to mount panels and fix electronics issues (Saturday - Tuesday)
- 15 people in on-site build crew with assistance from HEaT (Heavy Equipment and Transpo crew at Burning Man)
- Countless volunteers and hours leading up to that

So now for story time. What motivated me to contribute to such a project and what was my experience with it

# Motivations
> For those unfamiliar with Burning Man, it's a blank slate where people bring art and music to create a temporary city for 8 days
>
> For further reading, here's a lunch and learn presentation I gave about it: https://docs.google.com/presentation/d/1752fmM8tJgjFNEw0VnFdGHDjVNGsZ74Ofbg8H7lss_4/edit?usp=sharing

At the time of writing, I'm 29 years old and my dad would be 79 years old. He died earlier this year. I always had this desire to have kids before he passed away

Initially, I though this was due to wanting to have my children know their grandparents (I didn't have much of an experience here). Then after a speed counseling session at last year's Burning Man, I realized this wasn't the full case

> Burning Man story time! I didn't seek out speed counseling, more it found me -- as a lot of things do out there
>
> I was exploring a new part of the city. Someone offered me hot dogs, I accepted and stopped in. While eating and talking with my new friends, a woman invited me to speed dating
>
> I figured why not since I'd never done it before
>
> We went to the event, it turned out to be speed counseling but I decided to stick around anyway

Back to motivations, the epiphany I had at this speed counseling event was that half of my fear was rooted in being unable to teach my kids the content that my dad had taught me

One of these major fears being was lacking knowledge and practice with being handy

# Timeline
After getting back to San Francisco, I decided to properly address this. I had some EL wire that wasn't functioning properly. This was motivation enough to try to pick up electronics again for the nth time

http://twolfson.com/2018-04-07-debugging-my-first-circuit

Then in my dating life, someone told me about how Burning Man art projects are willing to teach you as long as you're willing to help. I was skeptical of said free lunch but was willing to see how things went

In March, I went to a Burning Man theme camp and art project meet and greet and signed up for a few volunteer lists

https://www.facebook.com/events/1829603957058261/

Then in June, I was contacted by both Rainbow Bridge and Chilopod, another art project, about coming to their respective warehouses to help out

I went over to Rainbow Bridge first but there wasn't much for me to do yet; the majority of the project was metalwork which I wasn't qualified for. That being said, there was a prototype panel which needed wiring and soldering so I jumped on that

Rainbow Bridge felt low-touch for me at the time so I started helping out on the Chilopod as well. This was wood fabrication which I had a tiny bit of experience with but this added way more: drills, impact drivers, circular saws, jigsaws, orbital sanders, and techniques (e.g. clamping with your body weight, proper weight/hold for drill/impact driver, accurate measurements over long distances)

Chilopod photo:

![Chilopod photo](/public/images/articles/rainbow-bridge/41994134_264323287553653_732079108338483200_n.jpg)

Attribution: https://www.instagram.com/p/BodR1lLhbY-/

Between June and mid-July, I helped on both the Rainbow Bridge and Chilopod. It became clear though that I didn't have enough time for both projects so I went with Rainbow Bridge as it felt they were more lacking in volunteers

From June through July, I was assigned planing the architecture for the interactivity portion of the bridge; figuring out the architecture for how the inputs (e.g. MIDI keyboard, microphone) output sound and feed the data to our computers and sourcing said components for said architecture (i.e. look up inventory on websites, verify it meets specifications/will stand up to being in a brutal hot and dusty environment, add to itemized list for review/purchase). There was also some testing/tracking down of components in August but the majority was done earlier

We had many iterations but the final architectural plan was:

<img alt="Mixing board config architectural plan" src="/public/images/articles/rainbow-bridge/Mixing board config v4.1 (labeled).svg" />

Additionally in mid July, we built more test panels so the software team had something to visualize against:

![Test panels](/public/images/articles/rainbow-bridge/38538876_2146569958889877_2073293435195883520_n.jpg)

Each panel is constructed as follows:

- LED strands (50 LED WS2811s) are tested on a standalone PixLite
- Plywood is CNC'd such that LEDs fit into holes
- Plywood is primed and painted in even-odd stripe timings to avoid accidental bleed
- LEDs are plugged into holes such that they sit at a specific depth
    - This was done mostly by eyeballing
    - Be sure to wear gloves here, you can easily get blisters otherwise
    - Also don't overwork yourself, it can hurt your thumbs for a while
    - Order of insertion
        - ![Strand insertion](/public/images/articles/rainbow-bridge/panel led layout.jpg)
- Busbars are fabricated with wires ending in 2 wire JST connectors to meet LED gaps to inject power
    - Wire lengths depend on the wire they're targetting
    - ![Busbars](/public/images/articles/rainbow-bridge/38779294_207537550117609_4061468216382193664_n.jpg)
- Wires are then routed behind LED strands to reduce likelihood of snagging
- Multimeter testing to verify there's no accidental continuity (some JST connectors were flipped, yey...)
- Panel is connected to a test PixLite and power supply to verify it lights up with no issue
- LEDs are adjusted to make sure they're optimally placed to emit maximum brightness (i.e. far enough through their hole)
- Test PixLite is disconnected from panel
- LEDs are caulked in place to avoid accidental falling out during transport

When I timed this all out, it took 3 hours per panel for the electronics only half

I could get into more detail about optoisolators, creating spare pixels, dealing with broken crimps and JST connectors but mentioning that we dealt with those is probably enough for now

We built 56 panels including 3 extra panels, 4 of the panels were different to handle the parts that met our footings

# Links
- Rainbow Bridge Facebook: https://www.facebook.com/TheRainbowBridgeProject/
- Rainbow Bridge Instagram: https://www.instagram.com/rainbow_bridge_2018/
- Rainbow Bridge organization: https://www.lookingup.art/
