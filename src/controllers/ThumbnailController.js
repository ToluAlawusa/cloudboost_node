'use strict'

const jwt = require('jsonwebtoken');
const gm = require('gm');
const request = require('request');

/**
 * This module houses the function that authenticates and creates a resized thumbnail of a downloaded image.
 * @returns {object}
 */

module.exports.makeThumbnail = function(req, res, next) {

    const joint = process.cwd()+'/src/public/images/';
 
	// Download to a directory and save with the original filename
	const options = {
	  url: req.body.url,
	  dest: joint + req.body.dest
	}
	
	gm(request(options.url))
		.resizeExact(50, 50)
		.write(options.dest, function (err) {
			console.log("i got here");
		  if (!err){
		  	console.log('thumbnail resize and generation successful');
		  } else {
		  	console.error(err);
		  }
	});

	const resizedPic = "http://localhost:3650/images/" + req.body.dest;

	return res.render('index', {picture: resizedPic});


}