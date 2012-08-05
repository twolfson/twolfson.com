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
    }
  });

  // Load in grunt-less
  // TODO: When on proper file system, change this back
  grunt.loadNpmTasks('/usr/local/lib/node_modules/grunt-less');

  // Set up default action
  // grunt.registerTask('default', 'watch');
  grunt.registerTask('default', 'less');
};