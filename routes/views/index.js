/**
 * (Site name here)
 * Developed by Engagement Lab, 2016
 * ==============
 * School page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class School
 * @author 
 *
 * ==========
 */
var keystone = require('keystone'),
    School = keystone.list('School'),
    // Item = keystone.list('Item'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'index';

    view.on('init', function(next) {

        var querySchool = School.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        });
        querySchool.exec(function(err, resultSchool) {
            if (err) throw err;

            locals.school = resultSchool;

            next();

        });
    });

    // Render the view
    view.render('School');

};
