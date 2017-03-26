var keystone = require('keystone');
var Player = keystone.list('Player');
var appRoot = require('app-root-path');
var TemplateLoader = require('../../lib/TemplateLoader');
var Templates = new TemplateLoader();

exports.get = function(req, res) {

	// console.log (req, "req");



	var query = Player.model.findOne({$or:[{userName:req.query.username},{email:req.query.username}]});

	console.log(query, " is the response");

	query.select('userName email pass');

	query.exec(function (err, person) {
		console.log ("person:" + person + ":person");
	  if (err) return handleError("we have not found your person" + err);
	  if (!person) {
	  	socket.emit("login:person_not_found");
	  	return;
	  }
	  console.log('This is %s with password %s and email %s.', person.userName, person.pass, person.email);
	  var data = {username:person.userName, password:person.pass, email:person.email}
	  if (person.pass === req.query.password) {

	  	console.log("correct password");

	  	// locals.username = person.userName;
	  	// locals.password = person.pass;
	  	// locals.email = person.email;
	  	

	  	Templates.Load("partials/profile", data, function(html) {
	  		// console.log(html, " --- html --- ");
	  		// console.log(data, " --- html --- ");
            res.send(html);

        }); 

	  } else {
	  	console.log("wrong password");
	  	socket.emit("login:wrong_password");
	  	return;
	  }
	});

};