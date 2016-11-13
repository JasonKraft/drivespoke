var express = require('express');
var router = express.Router();
var requestApi = require('request');
var request = require('../models/requests');


router.post('/', function(req, res, next) {
	console.log(req.body);
	requestApi('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.address + '&key=AIzaSyCe5Owcj0cRZ6QeR8XHsJOIdsTvvpTbuyU',
		function (error, response, body) {
			if (error) {
				console.log(error);
			}

		var json_data = JSON.parse(body);
		latitude = JSON.stringify(json_data.results[0].geometry.location.lat);
		longitude = JSON.stringify(json_data.results[0].geometry.location.lng);
		location = "{ lat:" + latitude + ", lng:" + longitude + " }";


		var riderData = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phone: req.body.phone,
			address: req.body.address,
			groupSize: req.body.groupSize,
			location: location
		}

		request.create(riderData, function(err, record) {
			if (err) {
				throw err;
			}

			record.sendSmsNotification('Your request for a ride has been confirmed! You will receive another message when a driver confirms your request.'/*, getCallbackUri(req.headers.host, record)*/);
			console.log(riderData);
			res.render('confirmation', {phone_number:req.body.phone,
										name:req.body.firstName + ' ' + req.body.lastName,
										address: req.body.address,
										num_passengers: req.body.groupSize,
										google_location: location
			});
		});
	});
});

function getCallbackUri (host, record){
	return `http://${host}/request/${record._id}/`
};

module.exports = router;
