var keystone = require('keystone'),
    User = keystone.list('User');
 
exports = module.exports = function(done) {
    
    new User.model({
        username: "admin",
        email: 'rwh.com',
        password: 'rwh',
        canAccessKeystone: true
    }).save(done());
    
};