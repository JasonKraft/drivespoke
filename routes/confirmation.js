var express = require('express');
var router = express.Router();
var request = require('../models/requests');


router.post('/', function(req, res, next) {
	/*
	request('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.address +'&key=AIzaSyCe5Owcj0cRZ6QeR8XHsJOIdsTvvpTbuyU',
		function (error, response, body) {
			var json_data = JSON.parse(body);
			latitude = JSON.stringify(json_data.results[0].geometry.location.lat);
			longitude = JSON.stringify(json_data.results[0].geometry.location.lng);
			location = "{ lat:" + latitude + ", lng:" + longitude + " }";
			
			res.render('confirmation', {phone_number:req.body.passenger_phone_num, 
								name:req.body.passenger_name, 
								address: req.body.passenger_address, 
								num_passengers: req.body.num_passengers,
								google_location: location
			});

		})
	*/



	var riderData = { 
		firstName: req.body.passenger_name,
		lastName: req.body.passenger_name,
		phone: req.body.passenger_phone_num,
		address: req.body.address,
		groupSize: req.body.num_passengers
		//location: location;
	}

	request.create(riderData);

	console.log(riderData);


	res.render('confirmation', {phone_number:req.body.passenger_phone_num, 
								name:req.body.passenger_name, 
								address: req.body.address, 
								num_passengers: req.body.num_passengers,
								//google_location: location
	});

});

module.exports = router;
