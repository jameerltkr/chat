var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
 
var method=config.prototype;

function config(app){
    // Setting the views 
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

    app.set('views', path.join(__dirname, 'client/www'));
    app.set('view engine', 'jade');

    app.use(bodyParser.json());
   
    //app.set('view engine', 'html');
    //app.engine('html', require('ejs').renderFile);
    //app.set('views', path.join(__dirname, '../client/www'));
    //app.use(express.static('../client/www'));

    //app.use(bodyParser.json());
    
    //// Use body parser for getting the parameter values
    //app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true
    }));
	
   
    
    
	
}

method.get_config=function(){
	return this;
}

module.exports = config;

