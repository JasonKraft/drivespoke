var express = require('express');
var router = express.Router();
var requests = require('../models/requests');

/* create a new ride request */
router.post('/', function(req, res, next) {
	res.send({"test": "true"});
});

router.get('/', function(req, res, next) {
	requests.find( function(err, request){
		res.send(request);
	});
});

router.get('/:id', function(req, res, next) {
	requests.findById(req.params.id, function(err, request) {
		res.send(request);
	});
});

router.delete('/:id', function(req, res, next) {
	requests.delete(req.params.id);
	res.send('deleted');
})

router.put('/:id', function(req, res, next) {
	console.log(req.body);
	requests.update(req.params.id, req.body);
	res.send('updated');
})

module.exports = router;
module.exports.getAllRequestsInWaitQueue = function(callback) {
	requests.find( { inWaitQueue: true, requestCancelled: false }, function(err, request){
		callback(request);
	});
};

module.exports.getAllMyRequests = function(uid, callback) {
	requests.find({inWaitQueue: false, requestCompleted: false, requestCancelled: false}, function(err, request) {
		callback(request);
	});
}

module.exports.markRideAsAccepted = function(rid, uid, callback) {
	var changes = {
		inWaitQueue: false,
		inAcceptedQueue: true,
		driverId: uid
	}
	requests.update(rid, changes);

	callback();
};

module.exports.markRideAsPickedUp = function(rid, uid, callback) {
	var changes = {
		inWaitQueue: false,
		inAcceptedQueue: false,
		pickedUp: true,
		driverId: uid
	}
	requests.update(rid, changes);

	callback();
};

module.exports.markRideAsDroppedOff = function(rid, uid, callback) {
	var changes = {
		inWaitQueue: false,
		inAcceptedQueue: false,
		pickedUp: false,
		requestCompleted: true,
		driverId: uid
	}
	requests.update(rid, changes);

	callback();
};
