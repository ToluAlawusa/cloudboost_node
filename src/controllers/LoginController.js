'use strict'

const jwt = require('jsonwebtoken');

/**
 * This module houses the function used to login users.
 * @returns {object}
 */

module.exports.authenticate = function(req, res) {

	const userMock = {
	    username: { type: String, required: true },
	    password: {
	        type: String,
	        required: true
	    },
    };

	const jwtToken = jwt.sign(userMock, process.env.SECRET_KEY, {
		expiresIn: 6000
	});

	return res.json({
		data: {
			username: req.body.username,
			password: req.body.password
		},
		success: true,
		token: jwtToken
	});


}