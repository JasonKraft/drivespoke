var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  mongoose.model('users').find(function(err, users) {
     res.send(users);
  });
});

// router.get('/:userId', function(req, res, next) {
//     mongoose.model('users').find({
//         _id: req.params.userId
//     }, function(err, users) {
//         res.send
//     });
// });

module.exports = router;
