var express = require('express');
var router = express.Router();
var passport = require('passport');

/* navigate to login page */
router.get('/', function(req, res, next) {
    res.render('login');
});

/* login request */
router.post('/', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	//failureFlash: 'Invalid username or password.'
}));

module.exports = router;
