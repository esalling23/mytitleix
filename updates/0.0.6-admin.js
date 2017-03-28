var keystone = require('keystone'),
    User = keystone.list('User');
 
exports = module.exports = function(done) {
    
    new User.model({
        username: "admin",
        email: 'admin.com',
        password: 'mytitleix',
        canAccessKeystone: true
    }).save(done());
    
};