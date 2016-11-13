var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestsSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	groupSize: {
		type: Number,
		required: true
	},
	location: {
		type: String,
		required: false
	},
	notes: {
		type: String,
		required: false
	},
	dateCreated: {
		type: Date,
		default: Date.now
	},
	dateLastUpdated: {
		type: Date,
		default: Date.now
	},
	inWaitQueue: {
		type: Boolean,
		default: true
	},
	inAcceptedQueue: {
		type: Boolean,
		default: false
	},
	pickedUp: {
		type: Boolean,
		default: false
	},
	requestCompleted: {
		type: Boolean,
		default: false
	},
	requestCancelled: {
		type: Boolean,
		default: false
	},
	driverId: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
});

var rideRequest = module.exports = mongoose.model('requests', requestsSchema);

module.exports.create = function(riderData) {
	var request = new rideRequest({
		firstName: riderData.firstName,
		lastName: riderData.lastName,
		phone: riderData.phone,
		address: riderData.address,
		groupSize: riderData.groupSize,
		location: riderData.location
	});

	request.save( function(err) {

	});
}

module.exports.delete = function(riderId) {
	rideRequest.findById(riderId).remove().exec();
}

module.exports.update = function(riderId, riderData) {
	rideRequest.findById(riderId, function (err, request){
		var keys = Object.keys(riderData);
		for(var i = 0; i<keys.length; i++) {
			//todo
			//if (request.hasOwnProperty(keys[i])) {
				request[keys[i]] = riderData[keys[i]];
			//}
		}
		request.save(function(err){});
	});
}