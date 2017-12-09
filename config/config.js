
var mongoose = require('mongoose');

module.exports.setConfig = function(){
	mongoose.connect("mongodb://localhost/cloudboost");
}