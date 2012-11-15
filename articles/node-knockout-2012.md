{
  "title": "Node Knockout 2012",
  "author": "Todd Wolfson",
  "date": "2012/11/14",
  "summary": "This weekend, <a href=\"http://nodeknockout.com/teams/jazzycat-emit-meow\">3 coworkers and I</a>, participated in <a href=\"http://nodeknockout.com/\">Node Knockout</a>, a 48 hour <a href=\"http://nodejs.org/\">node.js</a> based <a href=\"http://en.wikipedia.org/wiki/Hackathon\">hackathon</a>. For a while before the competition, we didn't have any good ideas. On the ride up to the city, the idea began to crystalize."
}

This weekend, [3 coworkers and I](http://nodeknockout.com/teams/jazzycat-emit-meow), participated in [Node Knockout](http://nodeknockout.com/), a 48 hour [node.js](http://nodejs.org/) based [hackathon](http://en.wikipedia.org/wiki/Hackathon). For a while before the competition, we didn't have any good ideas. On the ride up to the city, the idea began to crystalize.

Jesse (one of my teammates) had had the idea of building a motorcycle parking mapper; a database of geotagged data so motorcyclists like Jesse can find cheaper/free parking. I had pointed him to [Catmapper](http://catmapper.com/) and [Beardspotter](http://beardspotter.com/) and told him to talk to [Max Odgen](http://maxogden.com/), Catmapper's creator, during the competition.

However, on the day of the competition start, I thought of a Bubble Tea mapper. It wasn't really of any consequence until during the drive up I was talking about it and saw a cop on the side of the road. Then, I jumped to the thought of mapping where people get pulled over; it would be awesome to see where are frequent pullover points and gather information from that.

From there, the idea grew into a generalization of mappers; a database which stores any image, its geodata, and its keyword (e.g. motorcycle parking, bubble tea, cop) and a visual interface to see said data. 48 hours later, we had our finished product: [Mapper Maker](http://jazzycat-emit-meow.nko3.jitsu.com/).

You can find out how we are doing/vote for us/see how we did here:

[http://nodeknockout.com/teams/jazzycat-emit-meow](http://nodeknockout.com/teams/jazzycat-emit-meow).

&nbsp;

Additionally, during the contest, I open sourced two things:

[Health Watcher](https://gist.github.com/4049879) - A monitor for [/health](https://gist.github.com/3792062) and CSS. The intent is to run [nodemon](https://github.com/remy/nodemon) which will update the PID when it restarts the app (triggering a window) and run [grunt watch](https://github.com/gruntjs/grunt-contrib-watch) which should recompile CSS (triggering a seamless CSS update).

[geolocation lookup](https://gist.github.com/4053059) - Error-first [geolocation](https://developer.mozilla.org/en-US/docs/Using_geolocation) lookup. I later remade it into [140bytes](https://gist.github.com/4057883).