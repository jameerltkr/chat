/* Survey model */
var mongoose = require('mongoose');
var msg = mongoose.Schema({
    from_id: String,
    to_id: String,
    msg: String
});

var msg = mongoose.model('msg', msg);

module.exports = {
    msg: msg
};