var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema ({
	firstName: String,
	lastName: String,
	username: String,
	password: String,
	carMake: String,
	carModel: String,
	carLicensePlate: String,
	carColor: String,
	maxPassengers: Number
});

mongoose.model('users', userSchema);
