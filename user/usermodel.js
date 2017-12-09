var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    Schema = mongoose.Schema;
    

mongoose.connect("mongodb://localhost/cloudboost");    
mongoose.Promise = global.Promise;


var UserSchema = new Schema({
    username: { type: String, required: true },
    password: {
        type: String,
        required: true
    },

    created_at: Date,
    updated_at: Date
});

var token = jwt.sign(UserSchema, process.env.SECRET_KEY);


var User = mongoose.model('users', UserSchema);

module.exports = User;