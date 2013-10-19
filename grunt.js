module.exports = function (grunt) {
  // Configure the project
  grunt.initConfig({
    lint: {
      client: ['public/js/main.js']
    },
    // less: {
    //   all: {
    //     src: 'public/css/index.less',
    //     dest: 'dist/css/index.min.css',
    //     options: {
    //       compress: true
    //     }
    //   },
    //   unmin: {
    //     src: 'public/css/index.less',
    //     dest: 'dist/css/index.css'
    //   }
    // },
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
        files: 'public/css/**/*.less',
        tasks: 'css'
      },
      js: {
        files: 'public/js/**/*.js',
        tasks: 'js'
      }
    }
  });

  // Load in grunt dependencies
  grunt.loadNpmTasks('grunt-less');
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
  grunt.registerTask('install', 'curl unzip');

  // Register css and js tasks
  grunt.registerTask('js', 'jsmin-sourcemap');
  grunt.registerTask('css', 'less');

  // Set up default action
  grunt.registerTask('default', 'lint css js watch');
};