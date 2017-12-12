'use strict'

const jsonpatch = require('json-patch');
const jwt = require('jsonwebtoken');

/**
 * This module houses the function used for authentication and patching of user details.
 * @returns {object}
 */

module.exports.patchAuthenticate = function(req, res) {

	jwt.verify(req.token, process.env.SECRET_KEY, function(err){
		if(err){
			res.sendStatus(403);
		} else {
			const userInput = {
		    username: "gbenga",
		    password: "Dhalanla",
		    };

			const thepatch = [
		      { "op": "replace", "path": "/username", "value": "Nawaz" }
			];

			const mergedDoc = jsonpatch.apply(userInput, thepatch);
			
			 return res.json({
				data: mergedDoc,
				success: true
			});
		} 
	})
}