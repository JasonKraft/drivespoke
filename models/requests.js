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
	location: {
		type: String,
		required: true
	},
	groupSize: {
		type: Number,
		required: true
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
	}
});

mongoose.model('requests', requestsSchema);
