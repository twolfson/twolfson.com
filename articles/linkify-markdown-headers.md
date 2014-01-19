{
  "title": "How to linkify Markdown headers",
  "author": "Todd Wolfson",
  "date": "Sat Nov 02 2013 23:50:00",
  "keywords": "markdown, link, header, marked",
  "summary": "Add links to your Markdown headers"
}

In GitHub, Markdown headers are automatically linked. To achieve the same effect with the [marked][] node module, you need to override part of the lexer.

[marked]: https://github.com/chjj/marked

```js
// Modify marked's tokenizer to wrap
// header text in an `<a>`
var _tok = marked.Parser.prototype.tok;
marked.Parser.prototype.tok = function () {
  // If this is a heading, use our custom parser
  // https://github.com/chjj/marked/blob/v0.2.10/lib/marked.js#L845-L855
  // NOTE: This is for marked@0.2.10
  if (this.token.type === 'heading') {
    var headerText = this.token.text.toLowerCase();
    var slug = headerText.replace(/[^\w]+/g, '-');
    return '<h'
          + this.token.depth
          + ' id="'
          + slug
          + '">'
          + '<a href="#' + slug + '">'
          + this.inline.output(this.token.text)
          + '</a>'
          + '</h'
          + this.token.depth
          + '>\n';
  }

  // Otherwise, run the normal function
  return _tok.apply(this, arguments);
};
```

The end result is:

```js
marked.parse('# Hello World');
/*
<h1 id="hello-world">
  <a href="#hello-world">Hello World</a>
</h1>
*/
```
