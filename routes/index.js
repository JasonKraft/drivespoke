var express = require('express');
var router = express.Router();
var ride_requests = require('./requests');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DriveSpoke' });
});

router.get('/driver_map', function(req, res, next) {
  res.render('driver_select', {ride_request: ride_requests.getAllRequests() });
})

module.exports = router;
