var cfg = {};
var defaultMongoUrl = 'mongodb://localhost/drivespoke';

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;

// A random string that will help generate secure one-time passwords and
// HTTP sessions
cfg.secret = process.env.APP_SECRET || 'keyboard cat';

// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

// A Twilio number you control 
cfg.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// MongoDB connection string - MONGO_URL is for local dev,
cfg.mongoUrl = process.env.MONGO_URL || defaultMongoUrl ;

// Export configuration object
module.exports = cfg;
