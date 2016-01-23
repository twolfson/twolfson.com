{
  "title": "Do things that don't scale",
  "author": "Todd Wolfson",
  "date": "2016-01-23T16:50:28-0600",
  "keywords": "prioritization, scale",
  "summary": "Explanation of how to dial back overengineered solutions."
}

A while ago I read an article by Paul Graham with the same title "Do Things that Don't Scale".

http://paulgraham.com/ds.html

It described considering the more manual option to get things done faster for now. While the article was with respect to startups and their business, I have adopted a similar philosophy to development and loved the results.

# Server management
Provisioning and manging servers is typically done via a tool like [Puppet][] or [Chef][]. However during the early stages of a startup, there are drawbacks to this:

- Spending time to learn about best practices (bad if main developer is first timer)
- Time required for other developers to learn about said tool and how to use it
- Potential cost of debugging improper setup

Instead of this, I opted to script everything in `bash`. Most developers are friendly to the command line and anything they learn when writing scripts can be reapplied elsewhere (e.g. writing a one-off script for making `curl` requests).

**When it stops scaling:**

This can be used for a while via copy/paste and dependencies managed by `. script.sh` but at some point it becomes unweildy and we want templating and shared setup commands.

#
