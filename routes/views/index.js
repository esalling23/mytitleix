var keystone = require('keystone');
var Feed = keystone.list('Feed');
// var base = require('templates/layouts/base.hbs')
 
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'home';

    view.on('init', function(next) {

    	var feedQuery = Feed.model.find({
            // 'enabled': true
        });

        feedQuery.exec(function(err, resultFeeds) {
        	locals.feeds = resultFeeds;
            
        	next();
        });

    	
    });
    
    view.render('index', {layout: 'base'});
    
}
