{
  "title": "Open letter to gruntjs",
  "author": "Todd Wolfson",
  "date": "2013/02/15"
}

Dear [gruntjs][gruntjs],
&nbsp;&nbsp;&nbsp;&nbsp;The following letter is about my thoughts and complaints of the recent upgrade from `0.3` to `0.4`. Normally, I am enthusiastic about progression in the development world but this causes me much anger and frustration.

[gruntjs]: http://gruntjs.com/

# Introductions

My name is Todd Wolfson, I am [open source enthusiast][projects] who is a [**huge fan** of `grunt`][grunt-repos] in its current `0.3` form.

[projects]: http://twolfson.com/projects
[grunt-repos]: https://encrypted.google.com/search?q=grunt+twolfson&q=site:npmjs.org

I have a lot of respect for the work you have done on `grunt` and the collaboration it has caused for among the JavaScript community.

However, I feel that the proposed changes are a step in the wrong direction; undoing tons of man-hours not just in `grunt plugins`, but in every project that relies on `grunt` ([at least 5k if stargazers holds true][grunt-stars]).

[grunt-stars]: https://github.com/gruntjs/grunt/stargazers

# Complaints

## Changing interface without backwards compatibility

This honestly shocked me when I first heard about this. In fact, it shocked me so much that I was in denial until the date of writing this.

Since this is a minor update (as determined via [semver][semver]), everything that worked before should continue to work. Clearly, since you are asking people to update their plugins, this is not the case.

[semver]: http://semver.org/

## Loss of elegance
The new interface is not as elegant nor as developer friendly as the previous one. For example,

```js
var nonGruntConfig = {
  from: 'hello.js',
  to: 'world.js'
};

// grunt 0.3
var config = {
  src: nonGruntConfig.from,
  dest: nonGruntConfig.to
};

// The src was
config.src;

// grunt 0.4
var config = {};
config[nonGruntConfig.from] = nonGruntConfig.to;

// The src was
var srcs = Object.getOwnPropertyNames(config);
srcs[0];
```

I understand that the new interface makes adding batch files a lot easier. However, it is much more common to declare separate tasks for different file sets than share common options (e.g. `jade:pages jade:views`).

On the same note, the `jshint` plugin solved that problem much more gracefully in terms of interface.

Lastly, tasks are no longer single line strings. This was what made me fall in love with `grunt`. I hate the code bloat caused by `', '` and that rocked my world.