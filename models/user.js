/*  model */
var mongoose = require('mongoose');
var user_schema = mongoose.Schema({
    nickname: String,
    password: String,
    online: String,
    socket_id: String
});

var user = mongoose.model('user', user_schema);

module.exports = {
    user: user
};