var keystone = require('keystone');
var handlebars = require('express-handlebars');
var coreHelpers = require(__dirname + '/templates/helpers');

  var hbsInstance = handlebars.create({
                      layoutsDir: __dirname + '/templates/layouts',
                      partialsDir: [ { dir: __dirname  + '/../public', namespace: 'core' }, __dirname  + '/templates/partials'],
                      defaultLayout: 'base',
                      helpers: coreHelpers,
                      extname: '.hbs'
                    });
// var hbs = require('handlebars');
keystone.init({
  
  'name': 'My Title IX',
  
  'favicon': 'public/favicon.ico',
  'sass': 'public',
  'static': ['public'],
  
  'views': 'templates/views',
  'view engine': 'hbs',
  'handlebars': hbsInstance,
  'custom engine': hbsInstance.engine,

  'locals': {

    _: require('underscore')

  },
  
  'auto update': true,
  'mongo': 'mongodb://localhost/mytitleix',
  
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '(your secret here)', 

  'cloudinary config': { cloud_name: 'esalling', api_key: '723551514692962', api_secret: 'syiIllz2Vf6VglCJWRDZFsNafD8esallingesal' }, 
  // prefix all built-in tags with 'keystone_'
  'cloudinary prefix': 'keystone',
  // prefix each image public_id with [{prefix}]/{list.path}/{field.path}/
  'cloudinary folders': true,
  'cloudinary secure': true
  
});

require('./models');

keystone.set('routes', require('./routes'));
 
keystone.start();