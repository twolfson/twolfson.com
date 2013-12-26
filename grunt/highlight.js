exports.curl = {
  dest: 'tmp/highlight.zip',
  src: {
    url: 'http://highlightjs.org/download/',
    method: 'post',
    headers: {
      'Cookie': 'csrftoken=SameAsCookie'
    },
    form: {
      'csrfmiddlewaretoken': 'SameAsCookie',

      // See form on http://highlightjs.org/download/
      // '1c.js': 'on',
      // 'actionscript.js': 'on',
      // 'apache.js': 'on',
      // 'applescript.js': 'on',
      // 'asciidoc.js': 'on',
      // 'avrasm.js': 'on',
      // 'axapta.js': 'on',
      'bash.js': 'on',
      // 'brainfuck.js': 'on',
      // 'clojure.js': 'on',
      // 'cmake.js': 'on',
      // 'coffeescript.js': 'on',
      // 'cpp.js': 'on',
      // 'cs.js': 'on',
      'css.js': 'on',
      // 'd.js': 'on',
      // 'delphi.js': 'on',
      // 'diff.js': 'on',
      // 'django.js': 'on',
      // 'dos.js': 'on',
      // 'erlang-repl.js': 'on',
      // 'erlang.js': 'on',
      // 'fsharp.js': 'on',
      // 'glsl.js': 'on',
      // 'go.js': 'on',
      // 'haml.js': 'on',
      // 'handlebars.js': 'on',
      // 'haskell.js': 'on',
      // 'http.js': 'on',
      // 'ini.js': 'on',
      // 'java.js': 'on',
      'javascript.js': 'on', // alias: js
      // 'json.js': 'on',
      // 'lasso.js': 'on',
      // 'lisp.js': 'on',
      // 'lua.js': 'on',
      'markdown.js': 'on',
      // 'matlab.js': 'on',
      // 'mel.js': 'on',
      // 'mizar.js': 'on',
      // 'nginx.js': 'on',
      // 'objectivec.js': 'on',
      // 'parser3.js': 'on',
      // 'perl.js': 'on',
      'php.js': 'on',
      // 'profile.js': 'on',
      // TODO: YAML should be its own language but there is no highlighter...
      // Good reference: https://github.com/ajaxorg/ace/blob/master/lib/ace/mode/yaml_highlight_rules.js
      // https://github.com/isagalaev/highlight.js/blob/master/src/highlight.js
      'python.js': 'on', // alias: yaml
      // 'r.js': 'on',
      // 'rib.js': 'on',
      // 'rsl.js': 'on',
      'ruby.js': 'on',
      // 'ruleslanguage.js': 'on',
      // 'rust.js': 'on',
      // 'scala.js': 'on',
      // 'scss.js': 'on',
      // 'smalltalk.js': 'on',
      // 'sql.js': 'on',
      // 'tex.js': 'on',
      // 'vala.js': 'on',
      // 'vbnet.js': 'on',
      // 'vbscript.js': 'on',
      // 'vhdl.js': 'on',
      'xml.js': 'on' // alias: HTML
    }
  }
};