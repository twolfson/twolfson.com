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
    min: {
      client: {
        src: ['public/js/highlight.pack.js', 'public/js/main.js'],
        dest: 'dist/js/index.js'
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

  // Create a grunt task to update projects
  grunt.registerTask('projects', function () {
    var cp = require('child_process'),
        done = this.async();
    cp.exec('node ' + __dirname + '/projects/index.js');
    setTimeout(done, 2000);
  });

  // Set up default action
  grunt.registerTask('default', 'lint less min watch');
};