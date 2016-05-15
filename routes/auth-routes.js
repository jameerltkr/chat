/*requiring node modules starts */

var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require('fs');

var user = require('../models/user');
/*requiring node modules starts */

/*Telling Multer where to upload files*/
var upload = multer({ dest: './views/uploads' });


var method=routes.prototype;

function routes(app,sessionInfo){
	
	var file_path="";
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	//app.get('/', function(req, res){
        
	//	sessionInfo=req.session;
	//	/*Render Login page If session is not set*/
	//	if(sessionInfo.uid){
	//		res.redirect('/home#?id='+sessionInfo.uid);
	//	}else{
	//		res.render("login");		
	//	}
	//});
	app.get('/', function (req, res) {
	    res.sendFile(__dirname + '/client/www/views/login.html');
	});

	/*
		post to handle Login request
	*/
	app.post('/login', function(req, res){

		sessionInfo=req.session;

		username=req.body.username;
		password=req.body.password;

		console.log('username:: '+username);

		user.user.findOne({
	        username: username,
	        password:password
	    }, function (err, data) {
	        if (data) {
	        	sessionInfo.uid = data._id;

	        	data.online = 'Y';

	        	data.save(function(){});

	        	result_send={
			    		is_logged:true,
			    		id:data._id,
			    		msg:"OK"
			    };	

			    res.write(JSON.stringify(result_send));
				res.end();

	        	//res.write(JSON.stringify(result_send));
	        }else if(err){

	        	res.write(JSON.stringify(err));
				res.end();

	        }else{
	        	result_send={
		    		is_logged:false,
		    		id:null,
		    		msg:"BAD"
		    	};

		    	res.write(JSON.stringify(result_send));
				res.end();
	        }
	     }
	     );

	});

	/*
		post to handle username availability request
	*/
	app.post('/check_name', function(req, res){
		username=req.body.username;		

		user.user.findOne({
	        username: username
	    }, function (err, data) {
	        if (data) {
	        	result_send={
		    		msg:true
		    	};

		    	res.write(JSON.stringify(result_send));
				res.end();
	        }else{
	        	result_send={
		    		msg:false
		    	};

		    	res.write(JSON.stringify(result_send));
				res.end();
	        }
	    });
	});

	/*
		post to Register username request
	*/
	app.post('/register', upload.single('file'), function(req, res, next){
	    debugger;
		sessionInfo=req.session;
		/*
			Multer file upload starts
		*/
		var file_path = './views/uploads/' + Date.now()+req.file.originalname;
		var file_name = '/uploads/' + Date.now()+req.file.originalname;
		var temp_path = req.file.path;

		var src = fs.createReadStream(temp_path);
		var dest = fs.createWriteStream(file_path);		
		src.pipe(dest);
		/*
			Multer file upload ends
		*/
		src.on('end', function() {
			/*
				When uploading of file completes, Insert the user.
			*/
			var insert_data = new user.user({
				username:req.body.username,
				password:req.body.password,
				p_photo:file_name,
				timestamp:Math.floor(new Date() / 1000),
				online:'Y'
			});

			insert_data.save(function (err, data) {
	            if (err) {
	                res.write(JSON.stringify(err));
					res.end();	
	            } else if(!err){
	                result_send={
			    		is_logged:true,
			    		id:data._id,
			    		msg:"OK"
			    	};

			    	res.write(JSON.stringify(result_send));
					res.end();		
	            }else{
	            	result_send={
			    		is_logged:false,
			    		id:null,
			    		msg:"BAD"
			    	};

			    	res.write(JSON.stringify(result_send));
					res.end();	
	            }
	        });
		});
		src.on('error', function(err) { 
			/*
				Sending Error 
			*/
			res.write(JSON.stringify("Error"));
			res.end(); 
		});
	});

	/*
		post to handle Logout request
	*/
	

}

method.getroutes=function(){
	return this;
}

module.exports = routes;

/*
	Making query_runner function to Run mysl queries
*/
var query_runner=function(data,callback){
	
}