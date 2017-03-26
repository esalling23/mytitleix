module.exports = function (grunt, options) {


  return {
    styles: {
      files: '/public/styles/*.scss',
      tasks: ['sass']
    },
    js: {
      files: [
        'model/**/*.js',
        'routes/**/*.js',
        './*.js'
      ],

      options: {
        livereload: true
      }
    },
    livereload: {
      files: [
        'public/styles/**/*.css',
        'public/styles/**/*.scss',
        'templates/**/*.hbs',
        'node_modules/keystone/templates/**/*.hbs'
      ],
      options: {
        livereload: true
      }
    }
  }
};