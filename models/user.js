/* model */
var mongoose = require('mongoose');
var user_schema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    p_photo: String,
    timestamp: Number,
    online: String
});

var conversation_schema = mongoose.Schema({
    from_id: String,
    to_id: String,
    con_id: String,
    timestamp: Number
});

var conversation_reply = mongoose.Schema({
    id: String,
    reply: String,
    from_id: String,
    to_id: String,
    con_id: String,
    timestamp: Number
});

var msg = mongoose.Schema({
    id: String,
    msg: String,
    from_id: String,
    to_id: String,
    con_id: String,
    timestamp: Number
});

var user = mongoose.model('user', user_schema);
var conversation = mongoose.model('conversation', conversation_schema);
var conversation_reply = mongoose.model('conversation_reply', conversation_reply);
var msg = mongoose.model('msg', msg);

module.exports = {
    user: user,
    conversation: conversation,
    conversation_reply: conversation_reply,
    msg: msg
};