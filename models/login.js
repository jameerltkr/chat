/* Survey model */
var mongoose = require('mongoose');
var login_schema = mongoose.Schema({
    username: String,
    password:String
});

var login = mongoose.model('login', login_schema);

module.exports = {
    login: login
};