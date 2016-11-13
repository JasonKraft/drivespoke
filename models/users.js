var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var usersSchema = new Schema ({
	firstName: String,
	lastName: String,
	username: String,
	password: String,
	carMake: String,
	carModel: String,
	carLicensePlate: String,
	carColor: String,
	maxPassengers: Number,
	isOnDuty: {type: Boolean, default: false}
});

usersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', usersSchema);

module.exports.create = function(userData) {

};

module.exports.delete = function(userId) {

};

module.exports.update = function(userData) {

};
