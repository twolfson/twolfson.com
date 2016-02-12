/* jslint maxlen: 200 */
// jscs:disable maximumLineLength
// Allow super long line length for URLs
module.exports = function (grunt) {
  // Configure the project
  grunt.initConfig({
    curl: {
      // Inuit.css
      'tmp/inuit.css.zip': 'https://github.com/csswizardry/inuit.css/archive/v5.0.0.zip',

      // TODO: Don't forget about me
      // DEV: Disabled due to CSRF issues
      // // Highlight.js (includes CSS)
      // highlight: require('./grunt/highlight').curl,

      // Development dependencies
      'public/js/960gridder/960.gridder.js': 'https://raw.github.com/peol/960gridder/master/releases/1.3.1/960.gridder.src.js',
      'public/js/960gridder/jquery.js': 'http://peol.github.io/960gridder/releases/1.3.1/jquery.js',

      // External sprites
        // Bitcoin - http://bitcoin.org/en/press
        'public/images/support_src/bitcoin.png': 'https://docs.google.com/uc?export=view&id=0BwnE6HIoU4a4bUswMm5UWS1XakU',
        // Dogecoin - http://imgur.com/a/CKqPP
        'public/images/support_src/dogecoin.png': 'http://i.imgur.com/K2LYlv4.png',
        // Google image search
        'public/images/support_src/gratipay.png': 'http://s3.amazonaws.com/catapultpgh-madeinpgh/app/public/system/logos/7/medium/gratipay-logo-256.png?1367418240'
    },
    'curl-dir': {
      // SCSS mixins
      'public/css/mixins': [
        'https://raw.github.com/thoughtbot/bourbon/v3.0.1/app/assets/stylesheets/addons/_prefixer.scss',
        'https://raw.github.com/thoughtbot/bourbon/v3.0.1/app/assets/stylesheets/functions/_compact.scss',
        'https://raw.github.com/thoughtbot/bourbon/v3.0.1/app/assets/stylesheets/css3/_box-shadow.scss',
        'https://raw.github.com/thoughtbot/bourbon/v3.0.1/app/assets/stylesheets/css3/_linear-gradient.scss',
        'https://raw.github.com/thoughtbot/bourbon/v3.0.1/app/assets/stylesheets/css3/_transition.scss'
      ]
    },
    image_resize: {
      sprites: {
        files: {
          'public/images/sprites/github.png': 'public/images/sprites/github-2x.png',
          'public/images/sprites/purple-fork.png': 'public/images/sprites/purple-fork-2x.png',
          'public/images/sprites/purple-star.png': 'public/images/sprites/purple-star-2x.png',
          'public/images/sprites/rss.png': 'public/images/sprites/rss-2x.png',
          'public/images/sprites/twitter.png': 'public/images/sprites/twitter-2x.png'
        },
        options: {
          height: 32
        }
      },
      'support-me': {
        files: {
          'public/images/support/bitcoin.png': 'public/images/support_src/bitcoin.png',
          'public/images/support/dogecoin.png': 'public/images/support_src/dogecoin.png',
          'public/images/support/flattr.png': 'public/images/support_src/flattr.png',
          'public/images/support/gratipay.png': 'public/images/support_src/gratipay.png',
          'public/images/support/paypal.png': 'public/images/support_src/paypal.png'
        },
        options: {
          height: 25
        }
      }
    },
    unzip: {
      // Inuit.css
      inuit: {
        src: 'tmp/inuit.css.zip',
        dest: 'public/css/inuit',
        router: function (filepath) {
          return filepath.replace('inuit.css-5.0.0/', '');
        }
      },

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
