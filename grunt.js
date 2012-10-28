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
        src: ['public/js/highlight.pack.js', 'public/js/jquery.js', 'public/js/trunkata.js', 'public/js/main.js'],
        dest: 'dist/js/index.js',
        destMap: 'dist/js/index.js.map'
      }
    },
    watch: {
      less: {
        files: 'public/css/**/*.less',
        tasks: 'less'
      },
      min: {
        files: 'public/js/**/*.js',
        tasks: 'min'
      }
    }
  });

  // Load in grunt-less
  grunt.loadNpmTasks('grunt-less');

  // Load in grunt-jsmin-sourcemap
  grunt.loadNpmTasks('grunt-jsmin-sourcemap');

  // Create a grunt task to update projects
  grunt.registerTask('projects', function () {
    var cp = require('child_process'),
        done = this.async();
    cp.exec('node ' + __dirname + '/projects/index.js');
    setTimeout(done, 2000);
  });

  // Set up default action
  grunt.registerTask('default', 'lint less jsmin-sourcemap watch');
};