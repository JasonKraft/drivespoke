var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (!req.user) {
        res.render('index', { title: 'DriveSpoke'});
    } else {
        res.render('driver-dashboard', { title: 'DriveSpoke - Driver Dashboard', user: req.user });
    }
});

router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
