const express = require("express");
const PatchController = require('../controllers/PatchController');
const patchroute = express.Router();

// patch route that does patching using the required Controller method from PatchController
patchroute.route('/')
    .patch(PatchController.patchAuthenticate);

    
module.exports = patchroute;
