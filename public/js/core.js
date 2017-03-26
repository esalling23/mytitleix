'use strict';

//Global Variables
var player = [];
var section = $('.section-id');
var sectionId = section.attr("id");

$(function() {


	var sectionChange = function (page) {
		console.log (page);
		section.attr("id", page);
		console.log(section.attr("id") + " is the section-id");
		return section.attr("id");
	};

	var validateUser = function(isNew, info) {
		console.log ("validating...");


		addUser();
	};

	var addUser = function() {
		console.log ("adding...");
		// let user = "bob";
		// let userEmail = "email";
		// let password = "pass";

		
	};


    // Main Menu 
    var login = $('#login');
    var signup = $('#signup');
    var error = $('.error');
    var user = $('#username');
	var pass = $('#password');
	var email = $('#email');
    
	login.click(function() {
		// console.log ("user clicked 'login'!");

		if (section.attr("id") === "login"){
    		if (user.val() === '' || pass.val() === '') {
    			error.fadeIn();
    			error.text ("Please fill out all fields!");
    			error.addClass("red");

    		} else {
    			player.push({"username" : user.val(), "password" : pass.val()});
    			console.log (JSON.stringify(player));

    			validateUser(false, player);

    		}
    	} else if (section.attr("id") === "signup") {
    		error.fadeOut();
    		email.fadeOut();
    		user.attr("placeholder", "Username or Email");
			sectionChange("login");
		}
	    	
	});

	signup.click(function() {
		console.log ("user clicked 'signup'!");

		if (sectionId === "login"){
	    		error.fadeOut();

    		email.fadeIn();
    		user.attr("placeholder", "Username");
    		sectionChange("signup");
    	} else if (section.attr("id") === "signup") {
	    	if (user.val() === '' || pass.val() === '' || email.val() === '') {
    			error.fadeIn();
    			error.text ("Please fill out all fields!");
    			error.addClass("red");

    		} else {

    			validateUser();

    		}
    	}
		
	});
    

});