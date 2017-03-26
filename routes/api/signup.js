var keystone = require('keystone');
var Player = keystone.list('Player');

exports.create = function(req, res) {

	// console.log(req, "req");
	// console.log(res, "res");

	new Player.model({
		userName: req.body.username,
		email: req.body.email,
		pass: req.body.password
	}).save(function(err) {

		if (err)
	    console.log(err);
	  else 
	  	console.log ("success");

	});

	// console.log ("dim");
};
