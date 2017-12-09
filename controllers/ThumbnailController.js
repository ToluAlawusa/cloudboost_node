'use strict'

var jwt = require('jsonwebtoken');
var download = require('image-downloader');
var gm = require('gm');
module.exports.thumbnail = function(req, res, next) {

    var jointed = process.cwd()+'/public/images/';
 
	// Download to a directory and save with the original filename
	const options = {
	  url: req.body.url,
	  dest: jointed + req.body.dest,
	  newdest: jointed + req.body.newdest                  // Save to /path/to/dest/image.jpg
	}
	 
	download.image(options)
	  .then(({ filename, image }) => {
	    console.log('File saved to', filename)
	  }).catch((err) => {
	    throw err
	  });

	  console.log('i got here');
	gm(options.dest)
		.resizeExact(50, 50)
		.write(options.newdest, function (err) {
		  if (!err){
		  	console.log('done');
		  } else {
		  	console.error(err);
		  }
	});


	res.render('index', {picture: options});


}