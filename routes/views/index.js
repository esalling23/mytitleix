var keystone = require('keystone');
var Data = keystone.list('DataSheet');
// var base = require('templates/layouts/base.hbs')
 
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'home';

    view.on('init', function(next) {

    	var dataQuery = Data.model.find({
            // 'enabled': true
        });

        dataQuery.exec(function(err, resultDatas) {
        	locals.datas = resultDatas;
            console.log(resultDatas);
            
        	next();
        });

    	
    });
    
    view.render('index', {layout: 'base'});
    
}
