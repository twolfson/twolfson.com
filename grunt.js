module.exports = function (grunt) {
  // Configure the project
  grunt.initConfig({
    lint: {
      client: ['public/js/main.js']
    },
    less: {
      all: {
        src: 'public/css/index.less',
        dest: 'dist/css/index.min.css',
        options: {
          compress: true
        }
      },
      unmin: {
        src: 'public/css/index.less',
        dest: 'dist/css/index.css'
      }
    },
    'jsmin-sourcemap': {
      client: {
        cwd: 'public/js',
        src: ['highlight.pack.js', 'jquery.js', 'trunkata.js', 'main.js'],
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
      'test/test_files/jquery.js': 'http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js'
    },
    watch: {
      css: {
        files: 'public/css/**/*.less',
        tasks: 'css'
      },
      js: {
        files: 'public/js/**/*.js',
        tasks: 'js'
      }
    }
  });

  // Load in grunt-less
  grunt.loadNpmTasks('grunt-less');

  // Load in grunt-jsmin-sourcemap
  grunt.loadNpmTasks('grunt-jsmin-sourcemap');

  // Load in grunt-spritesmith
  grunt.loadNpmTasks('grunt-spritesmith');

  // Load grunt-curl
  grunt.loadNpmTasks('grunt-curl');

  // Create a grunt task to update projects
  grunt.registerTask('projects', 'Download projects info', function () {
    var cp = require('child_process'),
        done = this.async();
    cp.exec('node ' + __dirname + '/projects/index.js');
    setTimeout(done, 2000);
  });

  // Register css and js tasks
  grunt.registerTask('js', 'jsmin-sourcemap');
  grunt.registerTask('css', 'less');

  // Set up default action
  grunt.registerTask('default', 'lint css js watch');
};