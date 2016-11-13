var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');

/* navigate to registration page */
router.get('/', function(req, res, next) {
    res.render('register');
});

/* register request */
router.post('/', function(req, res, next) {
	User.register(new User({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		carMake: req.body.carMake,
		carModel: req.body.carModel,
		carColor: req.body.carColor,
		carLicensePlate: req.body.carLicensePlate,
		maxPassengers: req.body.maxPassengers
	})
	, req.body.password
	, function(err, user) {
		if (err) {
			console.log('failed to register user');
			return res.render('register', { user: user });
		}

		console.log('successfully registered user');
		passport.authenticate('local')(req, res, function() {
			res.redirect('/');
		});
	});
});

module.exports = router;
