var mongoose = require('mongoose');
var cfg = require('../config');
var twilio = require('twilio');
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

requestsSchema.methods.sendSmsNotification = function (message/*, statusCallback */, callback) {
  var client = new twilio.RestClient(cfg.twilioAccountSid, cfg.twilioAuthToken);
  var self = this;
  var options = {
    to:  self.phone,
    from: cfg.twilioPhoneNumber,
    body: message,
    //statusCallback: statusCallback
  };

  client.sendMessage(options, function(err, response) {
    if (err) {
        console.error(err);
    } else {
      var masked = self.phone.substr(0,
        self.phone.length - 5);
      masked += '*****';
      console.log('Message sent to ' + masked);
    }
  });

  if (callback) {
    callback.call(self);
  }
};

// var Order = mongoose.model('order', OrderSchema);
// module.exports = Order;

var rideRequest = module.exports = mongoose.model('requests', requestsSchema);

module.exports.create = function(riderData, cb) {
	var request = new rideRequest({
		firstName: riderData.firstName,
		lastName: riderData.lastName,
		phone: riderData.phone,
		address: riderData.address,
		groupSize: riderData.groupSize,
		location: riderData.location
	});

	console.log(request);

	request.save( function(err, record) {
		cb(err, record);
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

		riderData.dateLastUpdated = Date.now;
		request.save(function(err){});
	});
}
