const express = require("express");
const ThumbnailController = require('../controllers/ThumbnailController');
const thumbnailroute = express.Router();

// post route that downloads and resizes a thumbnail image using the required Controller method from ThumbnailController
thumbnailroute.route('/')
    .post(ThumbnailController.makeThumbnail);

module.exports = thumbnailroute;