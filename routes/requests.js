var express = require('express');
var router = express.Router();

/* create a new ride request */
router.post('/', function(req, res, next) {
	res.send({"test": "true"});
});

module.exports = router;
