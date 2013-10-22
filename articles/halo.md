{
  "title": "Halo - A modular MVC",
  "author": "Todd Wolfson",
  "date": "2013/03/17",
  "keywords": "halo, mvc, front end",
  "summary": "An introduction to [Halo](https://github.com/Ensighten/Halo): its good, bad, and ugly parts."
}

[Halo][Halo] is a client-side MVC framework based on [Addy Osmani's talks][addy-talks] about [Aura][aura]. The goal was to build a modular UI. We did this and took it to a bit of an extreme.

[Halo]: https://github.com/Ensighten/Halo
[addy-talks]: http://addyosmani.com/futureproofjs/
[aura]: https://github.com/aurajs/aura

The end result was so modular that we had a [standalone web page][sandbox] for loading a controller.

[sandbox]: https://github.com/Ensighten/Halo.extras/blob/master/src/pages/sandbox.html

If you want to get started using Halo, please visit the [README][Halo]. The remainder of this article will cover what it is good/bad at.

# The Good

## Modularity
As already mentioned, Halo is great at modularity. Every model, view, and controller is self-contained with a global mediator, [Sauron][Sauron] to talk through if they need to.

[Sauron]: https://github.com/Ensighten/Sauron

The convention of the framework is to keep interactivity at the HTML/Builder level. This leads to a flat and understandable view infrastructure since everything acts as jQuery plugin.

## Concrete channels on top of extensible system
There are concrete channels/methods that controllers/models interact over. However, they are on an extensible system to create custom side-channels as necessary. For example, `Sauron.voice('dom/insert')` is used for the [requiredom][requiredom] jquery plugin.

[requiredom]: https://github.com/Ensighten/Halo.extras/blob/master/src/public/js/requiredom.js

## Loose input/output
The framework is pretty loose in terms of input/output expected for models/controllers. It allows for infinite parameters and any of them could be callbacks which allows for quick hacks if you really need to.

# The Bad

## Models
Models need some work. They are currently extremely loose in that there is no framework around schema/creation/maintennance. It was initially conceived that APIs should do the heavy lifting, however, there should be some level of support on the client-side as well.

## State
State could use a boost; there is currently no template for a state model(s). As a result, state persistance/URL maintenance has a higher barrier to entry. However, there is a great foundation here; we can create a `state` model (internally stored object) with its own set of logic. Then, we can use a slick URL format (e.g. [URLON][URLON]) for persistance.

This has the benefit of removing brittle links/routes from your HTML and keeping state at the application level rather than template level.

[URLON]: http://blog.vjeux.com/2011/javascript/urlon-url-object-notation.html

## Non-standardized parameter length
Controllers/models are not standardized to a specific parameter length. This is a counterpoint to the `infinite parameters` point mentioned above. It is a coinflip if there should be enforcement; the benefit being less guesswork about each controller's input.

## Singleton models/controllers
Currently, you can only have one controller of its type at a time. Interestingly, this has never given me a trouble; there is never the exact same set of business logic in two places. If there is, it is probably improperly placed view logic and/or something is organizationally incorrect.

However, I still find this as an open wound. It has been partially addressed with the [factory pattern][factory] but is still an [open issue][multi-controller-issue].

[factory]: https://github.com/Ensighten/Halo.extras/blob/master/src/controllers/ModalFactory.js
[mutli-controller-issue]: https://github.com/Ensighten/Halo/issues/14

# The Future

It's still unclear how far I will be taking Halo. There are always more practical tools to build for the public. However, Halo itself is unique from a lot of other frameworks.

There are a [bunch of open issues][issues] to be taken care of/explored and we just finished up [TodoMVC][todomvc]. I will see you at the summit.

[issues]: https://github.com/Ensighten/Halo/issues
[todomvc]: https://github.com/addyosmani/todomvc/pull/490