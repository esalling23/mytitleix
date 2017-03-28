var _ = require('underscore'),
    keystone = require('keystone'), 
    Link = keystone.list('Link'), 
    MainNav = keystone.list('MainNav');
 
/**
    Initialises the standard view locals.
    Include anything that should be initialised before route controllers are executed.
*/
exports.initLocals = function(req, res, next) {
    
    var locals = res.locals;
    
    locals.user = req.user;
    
    // Add your own local variables here
    
    next();
    
};

// MAIN NAVIGATION
exports.MainNav = function (req, res, next) {

    var locals = res.locals;

    var queryMainNav = MainNav.model.findOne({}, {}, {
        sort: {
            'createdAt': -1
        }
    })
    .populate('links')
    .populate('logo');

    queryMainNav.exec(function(err, resultNav) {
        if (err) throw err;

        locals.mainNav = resultNav;
        console.log(locals.MainNav);
        next(err);
    });

}
 
/**
    Inits the error handler functions into `res`
*/
exports.initErrorHandlers = function(req, res, next) {
    
    res.err = function(err, title, message) {
        res.status(500).render('errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message
        });
    }
    
    res.notfound = function(title, message) {
        res.status(404).render('errors/404', {
            errorTitle: title,
            errorMsg: message
        });
    }
    
    next();
    
};
 
/**
    Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function(req, res, next) {
    
    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };
    
    res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length }) ? flashMessages : false;
    
    next();
    
};