var express = require("express");
var app = express();
app.use(express.static("."));
var mysql = require('mysql');
var bodyParser=require('body-parser');
 
var connection = require('config');
 
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + "Signup.html" );  
}) 

var con = mysql.createConnection({ //sets up mysql database
    host: 'localhost',
    user: 'root',
    password: 'Drexeldragons2022',
    database: 'reg',
});
con.connect(function (err) {
    if (err) {
        console.log('Error connecting to database'+err);
    } else {
        console.log('Database successfully connected');
    }
});
/*module.exports is an object that will be returned as the result of a require function call.*/

module.exports = connection; 


var Cryptr = require('cryptr');
var express=require("express");
var connection = require('config');
// cryptr = new Cryptr('myTotalySecretKey');
 
module.exports.register=function(req,res){
    var encryptedString = cryptr.encrypt(req.body.password);
    var users = {
        "name":req.body.name,
        "username":req.body.username,
        "password":encryptedString,
    }
    connection.query('INSERT INTO reg SET ?',users, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })
      }
    });
}

/* route to handle registration */
app.post('/api/register',registerController.register);
console.log(authenticateController);
app.post('/controllers/register-controller', registerController.register);

//
//
//// adds new students into the student table in the database
//app.get('/add', function (req, res) {
//    var id = req.query.id; //req.query contains the URL query parameters, which is the user's input (after the ? in the URL)
//	var first = req.query.first;
//	var last = req.query.last;
//	var dob = req.query.dob;
//	var major = req.query.major;
//    var mysql = "INSERT INTO student (studentid, first_name, last_name, dob, major) VALUES ('" + id + "','" + first + "','" + last + "','" + dob + "','" + major + "')";
//    con.query(mysql, function(err,rows,fields) {
//	 	if (err){
//	 		console.log('Error during query processing');
//	 	}
//	 	else {
//	 		res.send("You've been added!");
//	 	}
//	 });
//});


app.listen(8080, function () { //listens to the port 8080
    console.log("SERVER IS STARTING");
});



