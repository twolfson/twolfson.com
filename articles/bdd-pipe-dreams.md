{
  "title": "BDD pipe dreams",
  "author": "Todd Wolfson",
  "date": "2012/09/09"
}

Below are my most recent pipe dreams for BDD. While the example is based on testing a UI, it is applicable to anything as does BDD.

```js
// tests/login.json
{
  'A normal user': {
    'logging into its account': {
      'successfully logs in': true,
      'has edit permissions': true,
      'attempting to access the admin tab': {
        'receives an error back': true
      }
    }
  }
}

// test/commands.js - the language-specific and driver specific tests
module.exports = {
  'A normal user': function () {
    return {'username': 'myuser', 'password': 12345};
  },
  'logging into its account': function (user) {
    $('#username').val(user.username);
    $('#password').val(user.password);
    $('#loginform').submit();
  },
  'successfully logs in': function () {
    assert(window.loggedIn);
  },
  'has edit permissions': function () {
    var editDisabled = $('#editbutton').prop('disabled');
    assert.fail(editDisabled);
  },
  'attempting to access the admin tab': function () {

  }
};
```

compiles to

Backstory and attribution
--------------------------------
// @fat's talk 2012