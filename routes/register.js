var express = require('express');
var router = express.Router();
var userModel = require('../models/users');

/* navigate to registration page */
router.get('/', function(req, res, next) {
    res.render('register');
});

/* register request */
router.post('/', function(req, res, next) {
	
});

module.exports = router;
