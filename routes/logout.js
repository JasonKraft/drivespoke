var express = require('express');
var router = express.Router();

/* logout request */
router.get('/', function(req, res, next) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
