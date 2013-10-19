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
        },
      }
    },
    'jsmin-sourcemap': {
      client: {
        cwd: 'public/js',
        src: ['ready.js', 'highlight.pack.js', 'gator.js', 'gator-legacy.js', 'main.js'],
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
        destCSS: 'public/css/base/sprite-positions.less',
        imgPath: '../images/sprites.png',
        algorithm: 'alt-diagonal'
      }
    },
    curl: {
      // Inuit.css
      'tmp/inuit.css.zip': 'https://github.com/csswizardry/inuit.css/archive/v5.0.0.zip',

      // Front-end dependencies
      'public/js/ready.js': 'https://raw.github.com/ded/domready/master/ready.js',
      'public/js/gator.js': 'https://raw.github.com/ccampbell/gator/master/gator.js',
      'public/js/gator-legacy.js': 'https://raw.github.com/ccampbell/gator/master/plugins/gator-legacy.js',
      'test/test_files/jquery.js': 'http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js'
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
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-jsmin-sourcemap');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-zip');

  // Create a grunt task to update projects
  grunt.registerTask('projects', 'Download projects info', function () {
    var cp = require('child_process'),
        done = this.async();
    cp.exec('node ' + __dirname + '/projects/index.js');
    setTimeout(done, 2000);
  });

  // Register dependency tasks
  grunt.registerTask('install', ['curl', 'unzip']);

  // Register css and js tasks
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('js', ['jsmin-sourcemap']);
  grunt.registerTask('css', ['sass']);

  // Set up default action
  grunt.registerTask('default', ['lint', 'css', 'js', 'watch']);
};