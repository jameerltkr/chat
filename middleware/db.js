/*requiring mysql node modules 
var mysql = require("mysql");

var method = db.prototype;

function db() {*/
	/*
		creating MySql database connection 
	
	var con = mysql.createPool({
		host : 'localhost',
	  	user : 'root',
	  	password : 'm2n1shlko',
	  	database : 'angular'
	});
	this.connection=con;
}
method.getcon = function() {
	return this;
};
*/
//module.exports = db;

// configuring database settings

module.exports = {
    'secret': 'simpleChatSite',
    'database': 'mongodb://localhost:27017/chatdb'
};
