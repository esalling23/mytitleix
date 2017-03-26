'use strict()';

module.exports = function(grunt) {
  var gruntJobsConfig = {
    config: { src: __dirname + "/grunt/*.js" },
    pkg: grunt.file.readJSON('package.json')
  };


  require('load-grunt-tasks')(grunt);
  // grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');


  var configs = require('load-grunt-configs')(grunt, gruntJobsConfig);
  grunt.initConfig(configs);

  // Load the plugins
  
  // grunt.initConfig({});
  grunt.registerTask('default', 'Starting server', [
      'sass',
      'concurrent:dev'
    
  ]);

};