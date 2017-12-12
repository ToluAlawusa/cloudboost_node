const express = require("express");
const LoginController = require('../controllers/LoginController');
const loginroute = express.Router();

// post route that does login using the required Controller method from LoginController
loginroute.route('/')
    .post(LoginController.authenticate);

module.exports = loginroute;