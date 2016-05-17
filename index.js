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

var port = process.env.PORT || 3003;

var config = require('./config/config.js');     //Calling configuration file

//console.log('Clients are:: '+JSON.stringify(clients));


io.on('connection', function (socket) {
    process.env.userid = socket.id;

    console.log('User id:: ' + process.env.userid);

    socket.on('disconnect', function () {

        var id = socket.id;

        io.emit('user exit', id);
        console.log('user disconnected');
    });
});

// Initializing database
mongoose.connect(config.database, function (err) {
    if (err)
        console.log(err);
    else
        console.log('Connected to Database...');
});     // Connect to database
app.set('superSecret', config.secret); // secret variable

app.use(express.static('client/www'));

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Setting the views 
app.set('views', path.join(__dirname, 'client/www'));
app.set('view engine', 'jade');

app.use(bodyParser.json());

//app.get('/', function(req, res) {
//    res.sendFile(__dirname + '/client/www/index.html');
//});

//app.get('*', function(req, res) {
//    res.redirect('/');
//});

// app.listen(3000, function() {
//     console.log('App running on port 3000');
// });

//app.listen(80, function() {
//    console.log('App running on port 80');
//});

// Use body parser for getting the parameter values
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
}));

// Setting session
app.use(session({
    cookieName: 'session',
    secret: 'bhojpuri_360_session',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));



// Implementing routing for site users
require('./routes/index')(app, io);


// Starting the server for listening on PORT whatever
http.listen(port, function () {
    console.log("Server is listening on " + port);
});