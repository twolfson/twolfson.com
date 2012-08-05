module.exports = function (grunt) {
  // Configure the project
  grunt.initConfig({
    less: {
      all: {
        src: 'public/css/index.less',
        dest: 'dist/css/index.css',
        options: {
          compress: true
        }
      }
    },
    watch: {
      less: {
        files: 'public/css/**.less',
        tasks: 'less'
      }
    }
  });

  // Load in grunt-less
  grunt.loadNpmTasks('grunt-less');

  // Set up default action
  grunt.registerTask('default', 'less watch');
};