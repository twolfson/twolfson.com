module.exports = function (grunt) {
  // Configure the project
  grunt.initConfig({
    jshint: {
      client: ['public/js/main.js']
    },
    sass: {
      all: {
        files: {
          'dist/css/index.min.css': 'public/css/index.scss'
        },
        options: {
          style: 'compressed'
        }
      },
      unmin: {
        files: {
          'dist/css/index.css': 'public/css/index.scss'
        }
      }
    },
    'jsmin-sourcemap': {
      client: {
        cwd: 'public/js',
        src: ['ready.js', 'highlight.js', 'gator.js', 'gator-legacy.js', 'main.js'],
        dest: '../../dist/js/index.js',
        destMap: '../../dist/js/index.js.map'
      },
      'articles/develop-faster': {
        cwd: 'public/js/articles/develop-faster',
        src: [
          'player.js', 'init-screencast.js', 'grunt-screencast.js',
          'nodemon-screencast.js', 'livereload-screencast.js',
          'watch-screencast.js', 'autocorrect-screencast.js', 'render.js'
        ],
        dest: '../../../../dist/js/articles/develop-faster.js',
        destMap: '../../../../dist/js/articles/develop-faster.js.map'
      }
    },
    sprite: {
      all: {
        src: 'public/images/sprites/*.png',
        destImg: 'public/images/sprites.png',
        destCSS: 'public/css/base/sprites.scss',
        imgPath: '../images/sprites.png',
        cssFormat: 'css',
        algorithm: 'alt-diagonal',
        engine: 'canvas'
      }
    },
    curl: {
      // Inuit.css
      'tmp/inuit.css.zip': 'https://github.com/csswizardry/inuit.css/archive/v5.0.0.zip',

      // DEV: Disabled due to CSRF issues
      // // Highlight.js (includes CSS)
      // highlight: require('./grunt/highlight').curl,

      // Front-end dependencies
      'public/js/ready.js': 'https://raw.github.com/ded/domready/b3ba502dcd41b67fc2fcd06416b9d0be27a8dce2/ready.js',
      'public/js/gator.js': 'https://raw.github.com/ccampbell/gator/1.2.2/gator.js',
      'public/js/gator-legacy.js': 'https://raw.github.com/ccampbell/gator/1.2.2/plugins/gator-legacy.js',
      'test/test_files/jquery.js': 'http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js',

      // Development dependencies
      'public/js/960gridder/960.gridder.js': 'https://raw.github.com/peol/960gridder/master/releases/1.3.1/960.gridder.src.js',
      'public/js/960gridder/jquery.js': 'http://peol.github.io/960gridder/releases/1.3.1/jquery.js'
    },
    'curl-dir': {
      // SCSS mixins
      'public/css/mixins': [
        'https://raw.github.com/thoughtbot/bourbon/v3.0.1/app/assets/stylesheets/addons/_prefixer.scss',
        'https://raw.github.com/thoughtbot/bourbon/v3.0.1/app/assets/stylesheets/css3/_box-shadow.scss'
      ]
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
    },
    watch: {
      css: {
        files: 'public/css/**/*.scss',
        tasks: 'css'
      },
      js: {
        files: 'public/js/**/*.js',
        tasks: 'js'
      }
    }
  });

  // Load in grunt dependencies
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-jsmin-sourcemap');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-zip');

  // Create a grunt task to update projects
  grunt.registerTask('projects', 'Download projects info', function () {
    var cp = require('child_process'),
        done = this.async();
    cp.exec('node ' + __dirname + '/projects/index.js');
    setTimeout(done, 2000);
  });

  // Register dependency tasks
  grunt.registerTask('install', ['curl', 'unzip', 'copy', 'jsbeautifier']);

  // Register css and js tasks
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('js', ['jsmin-sourcemap']);
  grunt.registerTask('css', ['sass']);

  // Set up default action
  grunt.registerTask('default', ['lint', 'css', 'js', 'watch']);
};