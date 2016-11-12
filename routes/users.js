var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* navigate to login page */
router.get('/login', function(req, res, next) {
    res.render('login');
});

/* navigate to registration page */
router.get('/register', function(req, res, next) {
    res.render('register');
});

/* login request */
router.post('/login', function(req, res, next) {

});

/* register request */
router.post('/register', function(req, res, next) {

});

/* logout request */
router.post('/logout', function(req, res, next) {

});

module.exports = router;
