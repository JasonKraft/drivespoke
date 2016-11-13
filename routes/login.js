var express = require('express');
var router = express.Router();

/* navigate to login page */
router.get('/', function(req, res, next) {
    res.render('login');
});

/* login request */
router.post('/', function(req, res, next) {

});

module.exports = router;
