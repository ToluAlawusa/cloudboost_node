'use strict'

var jwt = require('jsonwebtoken');

module.exports.authenticate = function(req, res) {

	var userMock = {
    username: { type: String, required: true },
    password: {
        type: String,
        required: true
    },
    };


	var token = jwt.sign(userMock, process.env.SECRET_KEY, {
		expiresIn: 6000
	});
	//console.log(res.body);

	res.json({
		data: {
			username: req.body.username,
			password: req.body.password
		},
		success: true,
		token: token
	});


}