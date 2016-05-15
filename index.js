// Initializing packages which are required in this project----------
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var fs = require('fs');
var path = require('path');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var Session = require('express-session');

var port = process.env.PORT || 3004;
// the session is stored in a cookie, so we use this to parse it
app.use(cookieParser());

var Session = Session({
    secret: 'secrettokenhere',
    saveUninitialized: true,
    resave: true
});

io.use(function (socket, next) {
    Session(socket.request, socket.request.res, next);
});

app.use(Session);
var sessionInfo;
/* requiring config file starts*/
var config = require('./middleware/config.js')(app);

/* requiring config db.js file starts*/
var config = require("./middleware/db.js");
//var connection_object= new db();
//var connection=connection_object.connection; // getting conncetion object here 
var MongoDBPath = (process.env.NODE_ENV === 'production') ? process.env.MONGOLAB_URI : config.database;

mongoose.connect(MongoDBPath, function (error) {
    debugger;
    if (error) console.error(error);
    else console.log('mongo connected');
});
/* requiring config db.js file ends*/

/* 
	1. Requiring auth-routes.js file, which takes care of all Login & Registration page operation.
	2. Passing object of express, Database connection, expressSession and cookieParser.
	3. auth-routes.js contains the methods and routes for Login and registration page. 
*/
require('./routes/auth-routes.js')(app, Session, cookieParser, sessionInfo);
/* 
	1. Requiring routes.js file, which takes handles the Home page operation.
	2. Passing object of express, Database connection and object of socket.io as 'io'.
	3. routes.js contains the methods and routes for Home page  
*/
require('./routes/routes.js')(app, io, Session, cookieParser, sessionInfo);


//var users = [];

//io.on('connection', function (socket) {
//    console.log('a user connected');
//    process.env.userid = socket.id;

//    users.push(process.env.userid);

//    process.env.userlist= users;

//    console.log('User id:: ' + process.env.userid);

//    socket.on('disconnect', function () {
//        var array = users;
//        var index = array.indexOf(socket.id);

//        if (index > -1) {
//            array.splice(index, 1);
//       }
//        console.log('user disconnected');
//    });
//});

//// Initializing database
//mongoose.connect(config.database, function (err) {
//    if(err)
//        console.log(err);
//    else
//        console.log('Connected to Database...');
//});     // Connect to database
//app.set('superSecret', config.secret); // secret variable





//// Setting session
//app.use(session({
//    cookieName: 'session',
//    secret: 'bhojpuri_360_session',
//    duration: 30 * 60 * 1000,
//    activeDuration: 5 * 60 * 1000,
//}));



// Implementing routing for site users
//require('./routes/index')(app, io);


// Starting the server for listening on PORT whatever
http.listen(port, function () {
    console.log("Server is listening on " + port);
});