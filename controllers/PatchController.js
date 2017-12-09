'use strict'

var jsonpatch = require('json-patch');
var jwt = require('jsonwebtoken');

module.exports.patchAuthenticate = function(req, res) {

	jwt.verify(req.token, process.env.SECRET_KEY, function(err){
		if(err){
			res.sendStatus(403);
		} else {
			var userMock = {
		    username: "gbenga",
		    password: "animashaun"
		    };


			var thepatch = [
		      { "op": "replace", "path": "/username", "value": "segun" }
			];

			var mergedDoc = jsonpatch.apply(userMock, thepatch);
			//console.log(res.body);


			res.json({
				data: mergedDoc,
				success: true
			});
		}
	})
}