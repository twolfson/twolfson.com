hljs.LANGUAGES.yaml = function (hljs) {
  // Good reference: https://github.com/ajaxorg/ace/blob/master/lib/ace/mode/yaml_highlight_rules.js
  return {
    contains: [
      // https://github.com/isagalaev/highlight.js/blob/master/src/highlight.js
      hljs.HASH_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ],
    keywords: {
      literal: 'true false'
    },
    illegal: /(<\/|->|\?)/
  };
}(hljs);

hljs.LANGUAGES.yaml = hljs.LANGUAGES.python;