{
  "title": "BDD pipe dreams",
  "author": "Todd Wolfson",
  "date": "2012/09/09"
}

Below are my most recent pipe dreams for BDD. While the example is based on testing a UI, it is applicable to anything as does BDD.

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

    // Return the page for proper topic binding
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

These two files will compile during the cycle of the test to
```js

```

The beauty
----------
This separation allows for not only a proper separation of behavior and implementation but it also allows for language agnosticism as well as framework agnosticism. The test itself does not need to be rewritten -- only the atomic behaviors and assertions.

Backstory and attribution
--------------------------------
// @fat's talk 2012
// [Behance/Dan Chan syntax for testing](http://blog.behance.net/dev/testing-simplified-page-objects)