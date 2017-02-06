{
  "title": "Parallel visual testing",
  "author": "Todd Wolfson",
  "date": "2017-01-29T17:57:49-0600",
  "keywords": "visual, testing, perceptual, parallel",
  "summary": "Comparison of parallelization techniques for visual testing"
}

In my current project, we've been using visual tests. At some point, running tests in series no longer became feasible (4 minutes). As a result, we moved to parallel testing (40 seconds) but this was with mock data so it was trivial.

When we moved from mock data to a database, this became less trivial. We came up with following requirements:

- Data should be consistent between test runs (e.g. always see items A, B, C for `/foo`)
- Must support multiple data states (e.g. active item, archived item, no items)
- Easy to debug/reproduce in non-test environment

We came up with the following solutions:

# Development endpoints
Create one-off development endpoints for each test scenario (e.g. `/foo` would have a `/_dev/foo` which loads mock data and renders same page)

> This has been what I've used for a long time. It's proven itself well but it doesn't scale well =(

**Pros:**

- Easy to add new endpoints
- Easy to debug in development

**Cons:**

- High maintenance cost (e.g. need to write mock endpoint for every new endpoint, alternate data can be done via query strings)
- Easily to get out of sync (e.g. render data might not align to normal endpoint)

# Multiple databases
With server-side testing, tests can be parallelized by using multiple databases (e.g. `db_test0`, `db_test1`, ...). We could reuse the same technique with our visual tests. This does lead to more problems though:

- How does a browser know which server/database to use?
    - Solve via environment variable and URL resolving function
- How do we set/reset database fixtues?
    - Solve via a magic endpoint -- must be restricted to not be in `production`

**Pros:**

- Same accuracy as database (as it's using one)
- Easy to debug

**Cons:**

- Slow due to updating/resetting fixtures in database
- Tedious to maintain

# Test-generated HTML
During server-side testing, we could record the generated HTML to files. Then, we could host those files statically and run visual tests against them.

**Pros:**

- Requires maintaining only 1 test suite

**Cons:**

- Potentially lose testing accuracy due to some state only being preserved in JS
- Requires main test suite to be run to generate new HTML so we have a new series problem (i.e. tests could take even longer)
- Cannot easily iterate on tests as it's not a live server

# Mock mode
Create a development-only endpoint which sets a flag on the session to load mock data instead of database data (e.g. `/_dev/setup`). In each normal endpoint, use conditional logic to load data from fixtures instead of database.

**Pros:**

- Easy to maintain (i.e. write loader once, controller logic stays same, can reuse existing test fixtures)
- Easy to debug (e.g. enable mock mode in browser, go to normal endpoint)

**Cons:**

- Requires security diligence during initial setup (e.g. make sure that mock data can never be used in production)

# Results
We chose "Mock mode" and have been using it for the past month. It's been easy to debug and flexible (e.g. can switch between fixtures via query parameters).

We have been using [Gemini][] for testing which isn't the friendliest for customization but we've made it work. We optimized multiple steps into a single method (i.e. `load`):

- Visit development-only endpoint
- Configure session to load mock data
- Redirect to target page
    - This saves us an additional call/response for Selenium
- After screenshots are complete, wipe cookies (i.e. start next test with a new session to prevent test scenario cross-over)
    - This saves us many Selenium calls (e.g. no loading `/logout` URL or finding + clicking link)

[Gemini]: https://github.com/gemini-testing/gemini

Here's a sample setup endpoint, server endpoint, and Gemini test:

**Setup endpoint:**

```js
// Only load endpoint in development environment
app.get('/_dev/setup', function devSetupShow (req, res, next) {
  // If we don't allow mock mode, then reject the request
  // DEV: This acts as a sanity check for redundancy in security
  if (!config.allowMockMode) {
    throw new Error('Attempted mock mode setup in unsupported environment');
  }

  // Flag our user's session
  req.session.useMockMode = true;

  // If we have a redirect URI, use it
  if (req.query.redirect_uri) {
    if (redirectUri[0] !== '/') {
      return next(new HttpError.BadRequest('Expected redirect URL to be relative but it was not'));
    }
    res.redirect(req.query.redirect_uri);
  // Otherwise, complete our request
  } else {
    res.send('OK');
  }
});
```

**Server endpoint:**

```js
// Define common middleware to reuse common mock mode logic
app.use(function detectMockMode (req, res, next) {
  // If the user's session is using mock mode, flag our request
  if (req.session.useMockMode) {
    if (!config.allowMockMode) {
      throw new Error('Attempted mock mode setup in unsupported environment');
    }
    req.useMockMode = true;
  }
});

// Define our sample endpoint
app.get('/', [
  function loadDataRootShow (req, res, next) {
    if (req.useMockMode) {
      req.models = {
        items: [new Model({mock: data})]
      };
      next();
    } else {
      req.models = {
        // items: /* Loading logic for models */
      };
      next();
    }
  },
  function rootShow (req, res, next) {
    res.render('root.jade', {
      items: req.models.items.serialize()
    });
  }
]);
```

**test.js:**

```js
// Load in our dependencies
var gemini = require('gemini');
var geminiUtils = require('./utils/gemini').bind(gemini);

// Define our visual tests
gemini.suite('root', function (suite) {
  suite.load('/', geminiUtils.SETUPS.DEFAULT /* Logged in, using mocks */)
    .setCaptureElements('body')
    .capture('default');
});
```

**utils/gemini.js:**

```js
// Load our dependencies
var _ = require('underscore');
var url = require('url');

// Define common setup configurations
exports.SETUPS = {
  DEFAULT: {
    logged_in: 'true'
  },
  // DEV: LOGGED_OUT setup isn't necessary but nice for being explicit
  LOGGED_OUT: {}
};

// Define a binding function for custom suite methods
// DEV: `gemini` re-overwrites `gemini.suite` on every file load so we must use a `bind` method in every file
//   https://github.com/gemini-testing/gemini/blob/v3.0.2/lib/test-reader.js#L58
exports.bind = function (gemini) {
  // Extend `gemini.suite` with customizations
  // https://github.com/gemini-testing/gemini/blob/v3.0.2/lib/tests-api/index.js#L7-L40
  var _suite = gemini.suite;
  gemini.suite = function (name, callback) {
    // Create our suite
    _suite.call(this, name, function handleSuite (suite) {
      // Extend our suite
      // DEV: `suite-builder` directly writes new functions so we can do the same
      // https://github.com/gemini-testing/gemini/blob/v3.0.2/lib/tests-api/suite-builder.js
      suite.load = function (redirectUri, options) {
        // Fallback our options
        options = options || {};

        // Configure our `/_dev/setup` endpoint
        // DEV: We use `options` directly as query string (e.g. `logged_in: true` -> `?logged_in=true`)
        // DEV: This will navigate to `/_dev/setup`, set up session, and redirect to intended page
        //   If we did this without redirect magic, it would be `setUrl` navigating to original page
        //   then we navigate to the page and then navigate back to original page
        // DEV: `gemini.setUrl` will automatically prepend our hostname
        var setupUrl = url.format({
          pathname: '/_dev/setup',
          query: _.defaults({
            redirect_uri: redirectUri
          }, options)
        });

        // Define it as our URL for the suite
        suite.setUrl(setupUrl);

        // If we had a login action, then reset our session by wiping cookies
        // DEV: This is more efficient than using `/logout` as that requires navigation + finding element + clicking
        // https://github.com/gemini-testing/gemini/blob/v3.0.2/lib/tests-api/actions-builder.js#L76-L96
        // https://github.com/gemini-testing/gemini/blob/v3.0.2/lib/browser/index.js#L22-L73
        // https://github.com/admc/wd/blob/v0.4.0/lib/commands.js#L1998-L2010
        if (options.logged_in) {
          var logout = function (actions, find) {
            actions._pushAction(logout, function logoutFn (browserWrapper) {
              return browserWrapper._browser.deleteAllCookies();
            });
          };
          suite = suite.after(logout);
        }

        // Return our suite for a fluent interface
        return suite;
      };

      // Callback with extended suite
      callback(suite);
    });
  };

  // Return `exports` for a fluent interface
  return exports;
};
```
