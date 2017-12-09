'use strict'

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    jwt = require('jsonwebtoken'),
    path = require('path'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    mongoose = require('mongoose');

var secureRoutes = express.Router();
//var config = require('../config/config');
var LoginController = require('../controllers/LoginController');
var PatchController = require('../controllers/PatchController');
var ThumbnailController = require('../controllers/ThumbnailController');
//config.setConfig();

process.env.SECRET_KEY = 'cloudboostkey';   
// use of middlewares
// morgan for logging requests to the console
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('secured-api/v1', secureRoutes);

// assigning engine to view dust files
app.engine('dust', cons.dust);

// setting the view engine to render from views folder and the template to render is dust
app.set("view engine", "dust");
app.set("views", __dirname + '/../views');

// serving public files from here
app.use(express.static(path.join(__dirname, '../public')));

// mount routes
// app.use('/todos', todorouter);

app.get('/', function(req, res){
	res.send('we are here again');
});

app.post('/api/v1/login', LoginController.authenticate);
app.post('/api/v1/thumbnail', ThumbnailController.thumbnail);
app.patch('/api/v1/patch-protected', checkIfTokenPresent, PatchController.patchAuthenticate);

function checkIfTokenPresent(req, res, next){
	const bearerHeader = req.headers["token"];
	if(typeof bearerHeader !== "undefined"){
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];
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