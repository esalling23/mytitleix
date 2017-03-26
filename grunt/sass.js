module.exports.task = {
  dist: {
    options: {
      style: 'expanded',
      lineNumbers: true,
      sourcemap: 'none'
    },
    files: [{
      expand: true,
      cwd: '../public/styles',
      src: [ '*.scss' ],
      dest: '../public/styles',
      ext: '.css'
    }]
  }
};