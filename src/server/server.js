'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const path = require('path');
const cons = require('consolidate');
const dust = require('dustjs-helpers');

const LoginRouter = require('../api/LoginRoutes');
const PatchRouter = require('../api/PatchRoute');
const ThumbnailRouter = require('../api/ThumbnailRoutes');


process.env.SECRET_KEY = 'cloudboostkey'; 

// use of middlewares
// morgan for logging requests to the console
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// assigning engine to view dust files
app.engine('dust', cons.dust);

// setting the view engine to render from views folder and the template to render is dust
app.set("view engine", "dust");
app.set("views", __dirname + '/../views');

// serving public files from here
app.use(express.static(path.join(__dirname, '../public')));

// mount routes
 app.use('/api/v1/login', LoginRouter);

 // Please for these below listed protected routes, a request body with field name "token" 
 // and value of the string "token" gotten from the Login response above should be included
 // as input, also note in postman, the token-value must be prefixed with a string named "Bearer"
 // with a space. i.e "Bearer token-value"
 app.use('/api/v1/patch-protected', checkIfTokenPresent, PatchRouter);
 app.use('/api/v1/thumbnail-protected', checkIfTokenPresent, ThumbnailRouter);


app.get('/', function(req, res){
	res.send("we are here again");
});

/**
 * This module serves as middleware and houses the function used to verify presence of token.
 */

function checkIfTokenPresent(req, res, next){
	var bearerBody = req.body["token"];
	if(typeof bearerBody !== "undefined"){
		var bearer = bearerBody.split(" ");
		var bearerToken = bearer[1];
		req.token = bearerToken;
		next();

	} else {
		res.sendStatus(403);
	}

}

// express's automatic error handler middleware
app.use(function(err, req, res, next){

	res.status(501).json(err.message);

});





module.exports = app;