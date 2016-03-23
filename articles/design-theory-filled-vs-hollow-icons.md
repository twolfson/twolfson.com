{
  "title": "Design theory: Filled vs hollow icons",
  "author": "Todd Wolfson",
  "date": "2016-03-22T22:24:59-0500",
  "keywords": "design, icons",
  "summary": "When redesigning my business card, I discovered a design theory on icons."
}

# Background
Occasionaly in programming I have an epiphane about an ideal solution to a problem. For example, when building `spritesmith` I thought registering formats via common function would be practical since it gives us a forward-compatible bridge to add wrappers if we ever need them.

```js
// Simplified version of https://github.com/Ensighten/grunt-spritesmith/blob/6.3.1/src/grunt-spritesmith.js#L10-L46
function ExtFormat() {
  this.formatObj = {};
}
ExtFormat.prototype = {
  add: function (name, val) {
    this.formatObj[name] = val;
  },
  get: function (filepath) {
    var ext = path.extname(filepath);
    return this.formatObj[lowerExt];
  }
};

// Add our img formats
var imgFormats = new ExtFormat();
imgFormats.add('.png', 'png');
imgFormats.add('.jpg', 'jpeg');
imgFormats.add('.jpeg', 'jpeg');
```

In reality, these can be false epiphanes since there's no simple answer to a question (e.g. an object would have worked equally as well and saved us lines). **Pro-tip:** The answer is always "it depends". But usually, these epiphanes help in finding the nuances for some cases.
