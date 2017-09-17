'use strict';


var keystone = require('keystone'),
    async = require('async'),
    appRoot = require('app-root-path');
    
var School = keystone.list('School'),
    Data = keystone.list('Data');


// Load a school's data and graph
exports.get = function(req, res) {

    // Check if this user already has a profile
    var query = School.model.findOne({ key:req.query.key });
    query.exec(function (err, profile) {

        if (err)
            console.log(err);
        else {

            let data = {
                prompt: req.query.text,
                promptId: gameCode, 
                icons: icon
            };

            Templates.Load('partials/highchart', data, function(html) {

                locals.section = 'school';

                res.send({data: data, eventData: html});

            }); 
        }
    });
};

