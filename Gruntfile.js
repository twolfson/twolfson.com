// Allow super long line length for URLs
module.exports = function (grunt) {
  // Configure the project
  grunt.initConfig({
    curl: {
      // TODO: Don't forget about me
      // DEV: Disabled due to CSRF issues
      // // Highlight.js (includes CSS)
      // highlight: require('./grunt/highlight').curl,
    },
    unzip: {
      // Highlight.js
      highlight: {
        src: 'tmp/highlight.zip',
        dest: 'tmp/highlight'
      }
    },
    copy: {
      // Highlight.js's css
      'public/css/base/highlight.scss': 'tmp/highlight/styles/github.css',

      // TODO: We are copying minified content which is being beautified in place. Stop doing this.
      'public/js/highlight.js': 'tmp/highlight/highlight.pack.js'
    },
    jsbeautifier: {
      highlight: {
        src: 'public/js/highlight.js'
      }
    }
  });

  // Load in grunt dependencies
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-image-resize');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-zip');

  // Register dependency tasks
  grunt.registerTask('install', ['curl', 'unzip', 'copy', 'jsbeautifier']);
};
