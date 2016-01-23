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

# Scripting
On occasion something will need to be scripted for a production environment (e.g. lowercasing user emails, backfilling legacy data).

The main consideration is: Will it take more time to write a one-off script or make the edits by hand via our internal tool?

After a bit of research, I usually reason that 20 edits by hand is fine but 100 will be faster by script.

**Warning:** Please never use a production REPL or directly touch your production database without serious consideration. Usually you will miss an important hook or edge case that will cost more time to reverse. We prefer scripts or edits via tools since these have gone through code review.

# Overengineered scripts
In the event that we write a script, try to keep it more targeted than generalized.

We can spend all the time we want to generalize a script for future use cases. However code bases change and trying to predict future use cases without having them defined for immediately upcoming business cases (e.g. within next 1/2 weeks) is a no-win scenario.

When we need to cover the other similar use case, we can copy/paste the existing script and edit what we need. If it helps, we can leave a comment in the original script about how to edit the script for future use cases.


