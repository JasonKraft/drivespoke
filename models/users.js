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

usersSchema.methods.sendSmsNotification = function (message/*, statusCallback */, callback) {
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

usersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', usersSchema);

module.exports.create = function(userData) {

};

module.exports.delete = function(userId) {

};

module.exports.update = function(userData) {

};
