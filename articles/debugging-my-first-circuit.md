{
  "title": "Debugging my first circuit",
  "author": "Todd Wolfson",
  "date": "2018-04-07T19:15:14-0500",
  "keywords": "debugging, circuit, electronics",
  "summary": "I debugged a EL wire circuit and fixed the broken part"
}

I've been slowly picking up electronics over the past year. At this year's Burning Man, 3 out of 5 EL wires broke on me. This time, instead of e-cycling them, I decided to use it as a learning opportunity.

If you've never done electronics before, SparkFun is a great resource. This video got me back into it (like me learning about [Firebug][] for the first time) and the rest of their lessons are great:

<iframe width="560" height="315" src="https://www.youtube.com/embed/SLkPtmnglOI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<https://learn.sparkfun.com/tutorials/tags/concepts>

[Firebug]: https://getfirebug.com/

## 2017/10/11
The first step was isolating the problem. The EL wire I have is 1 circuit + battery holder and 1 wire which clips in.

TODO: Add image with pointers to different halves

I took 1 broken blue set and 1 working red set and tried different mix and match combinations.

- Red wire + red circuit - WORKS
- Blue wire + red circuit - WORKS
- Red wire + blue circuit - FAILURE
- Blue wire + blue circuit - FAILURE

That made it definitively that something in the blue circuit was broken. Maybe it was the batteries so I double checked

- Blue circuit + blue batteries - FAILURE
- Red circuit + blue batteries - WORKS

Yep, definitely the blue circuit

-----------------------

Next, we wanted to keep on isolating the problem. We opened up both of the circuits and visually inspected them

There were no visually broken capacitors (I had learned about this being a common problem in LCD/LED screens) so maybe it's a connectivity issue

I connected a multimeter to the ground terminal of where the circuit would be. Then poke around with the positive terminal on the rest of the board, everything seemed connected on both boards

I couldn't figure out what was wrong

Then, I decided to connect to the button's solder points (I guess it must have been at the start/end of the circuit)

TODO: Add image of circuit (prob desoldered version is fine)

Ah ha! It looks like the red circuit's button is continuous most of the time whereas blue's only activates when pushes in a very specific corner

I put it back together and pushed the blue button in a specific corner and it worked!

So the problem is the broken button

I had only soldered once before this point and that was for jumper headers so I was taking things slow

## 2017/10/22
The idea I had to verify the button truly was the problem was to replace it with wires as a proof of concept

As a result, I:

- Verified wires would fit through button's casing hole
- Desoldered button
- Soldered in wires
- Reconstructured chassis (so we could add batteries/power)
- Touched wires together

It worked!!

TODO: Add video here (maybe Imgur gifv)

For double sanity, we hooked up the button to the mutlimeter and confirmed it was still spotty

## Some time between 2017/10/22 and 2017/12/20
Now that the issue was identified, we decided to order replacement buttons

However, clearly this wasn't going to future proof the items for it happening again

At the time, I thought the issue was the buttons being too tall so my solution was to buy a shorter button, hot glue it to the top of the case, and run wires to the PCB's holes

I'm still a little doubtful that that was the problem (e.g. could have been dust from Burning Man getting into the button's internal circuits)

So I might wind up taking even more precautions in the future (e.g. taping over button's hole)

Anyway, at this point I bought momentary buttons to get started

## 2017/12/20
The buttons had arrived and I did a simple placement test to verify it would fit

## 2017/12/31
I hot glued a button to the top of the case

I verified its connectivity afterwards (e.g. heat could damage circuit)

Don't worry, I still went out on NYE ;)

# 2018/02/14
Delay caused by wanting to buy a fume extractor and personal life

Also purchased a new soldering iron for better temperature control (Hakko Fx888-D is wonderful). My old solder was a Weller with no knobs, only a plug for the wall outlet

Desoldered EL test wires

# 2018/02/19
The following is directly from my notes:

- Delay due to purchasing wire strippers and solid core wire (24 AWG from hardware store, couldn't find 22 AWG =(
- Learned to "wet" wires before soldering
    - https://www.youtube.com/watch?v=IkjMK26ROcM
- Soldered wire to button
- Ran wires through holes
- Tried to solder again but the traces weren't accessible (soo much wicked off or burned over)
    - I now know how to deal with this (see Adafruit troubleshooting later on)
- Dropped temp to 650
- Soldered into alternative holes but those weren't connected to the proper traces
- Tried another board
- Desoldered button partially as well as snipped ends as well as broke physically
    - I was trying to avoid ruining traces. Unfortunately, I still did
- Soldered 1 wire fine but trouble with other one
    - Solder was getting onto wire but refusing to go on pad so it would stay on wire or iron
- Got frustrated multiple times
- Finally read through https://learn.adafruit.com/adafruit-guide-excellent-soldering/common-problems
- First tried isopropyl alcohol then soldering again
- No luck
- Got frustrated and read some more
- Tried scraping with knife and saw copper lead exposed as mentioned towards bottom of article
- Exposed enough copper lead and soldered to it
- Closed up case, inserted batteries, and pressed button
- LED was displaced so could barely see it
- Connected to EL wire
- IT FUCKING WORKS!!

TODO: Add final image
