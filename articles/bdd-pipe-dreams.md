{
  "title": "BDD pipe dreams",
  "author": "Todd Wolfson",
  "date": "2012/09/09",
  "keywords": "bdd, pipe dreams, imagination",
  "summary": "Below are my most recent pipe dreams for BDD. While the example is based on testing a UI, it is applicable to anything as does BDD.",
  "relatedArticles": ["BDD and the Future"],
  "_relProjects": ["doubleshot"]
}

Below are my most recent pipe dreams for BDD. While the example is based on testing a UI, it is applicable to anything as does BDD. Also, I did make a point to mention these thoughts while at NodeConf SummerCamp 2012, so hopefully these thoughts will start spreading more prevalently.

The following would be a set of files located inside of the `tests` directory of an application. Each JSON file acts as a set of BDD tests but does not actually contain any of the driving/testing responsibilities. This is the purest separation that BDD can give us -- separating behavior from implementation.

There is also a `commands.js` which acts as the implementation side of the house. Each of the branches in each JSON file will use these as either topics for contexts and subcontexts or asserts/vows for leafs of the structure.

```js
// tests/login.json
{
  'A normal user': {
    'logging into its account': {
      'successfully logs in': true,
      'has edit permissions': true,
      'attempting to access the admin page': {
        'is redirected': true
      }
    }
  }
}
```

```js
// tests/commands.js - the language-specific and driver specific tests
module.exports = {
  'A normal user': function () {
    // Return the credentials for the user
    return {'username': 'myuser', 'password': 12345};
  },
  'logging into its account': function (user) {
    // Fill out the form with the user credentials
    $('#username').val(user.username);
    $('#password').val(user.password);
    $('#loginform').submit();
  },
  'successfully logs in': function () {
    // Assert that the form has successfully been processed
    assert(window.loggedIn);
  },
  'has edit permissions': function () {
    // Assert that the edit button is not disabled
    var editDisabled = $('#editbutton').prop('disabled');
    assert.fail(editDisabled);
  },
  'attempting to access the admin tab': function () {
    // Attempt to navigate to the admin page
    var page = '/admin';
    window.location = page;

    // Return the page proper topic binding
    return page;
  },
  'is redirected': function (page) {
    // Assert that we are not on the target page
    var location = window.location,
        onPage = location.indexOf(page) === -1;
    assert.fail(onPage);
  }
};
```

These two files will compile during the testing to
```js
{
  'A normal user': {
    topic: function () {
      return {'username': 'myuser', 'password': 12345};
    },
    'logging into its account': {
      topic: function (user) {
        $('#username').val(user.username);
        $('#password').val(user.password);
        $('#loginform').submit();
      },
      'successfully logs in': function () {
        assert(window.loggedIn);
      },
      'has edit permissions':  function () {
        var editDisabled = $('#editbutton').prop('disabled');
        assert.fail(editDisabled);
      },
      'attempting to access the admin page': {
        topic: function () {
          var page = '/admin';
          window.location = page;
          return page;
        },
        'is redirected': function (page) {
          var location = window.location,
              onPage = location.indexOf(page) === -1;
          assert.fail(onPage);
        }
      }
    }
  }
}
```

The beauty
----------
This separation allows for not only a proper separation of behavior and implementation but it also allows for language agnosticism as well as framework agnosticism. The test itself does not need to be rewritten -- only the atomic behaviors and assertions.

Backstory and attribution
--------------------------------
I have been thinking about how to make my JS tests framework agnostic for a while now. I boiled it down to writing a normal set of tests (in Vows format of course) and a facade for interactions. Then, that would hook up to a proper engine for the test framework I wanted -- e.g. Mocha, Testling, JSTestDriver.

Additionally, while watching the [JS Conf 2012 talks](http://2012.jsconf.us/), I watched the one by [Jacob Thorton (@fat)](https://twitter.com/fat). There was a part in there that stuck to me -- [Mustache's tests](https://github.com/janl/mustache.js/tree/master/test/_files) uses input/output files. This means, you take test1.input, process it, and if it matches test1.output then the test passes.

The consequence that @fat mentioned was this made the tests agnostic to the module itself. This leads to anyone being able to rewrite the module as long as they kept the same API. However, a corollary that I came to and was in awe of was *these tests are agnostic to the language*.

The last piece of attribution comes from [Behance](http://www.behance.net/) and [Dan Chan](https://twitter.com/brokenthumbs). One day, Dan released this [blog post](http://blog.behance.net/dev/testing-simplified-page-objects) which gave a slick syntax for testing out UI's. This syntax works very nice with BDD context changes and allows for the separation used in the initial code example.