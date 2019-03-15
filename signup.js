var express = require("express");
var app = express();
app.use(express.static("."));
var mysql = require('mysql');
var bodyParser=require('body-parser');
  
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/signup', function(req, res){
    var name = req.query.name;
    var username = req.query.username;
    var password = req.query.password;
    var mysql  = "INSERT INTO reg(name,username,password) VALUES('" + name + "','" + username + "','" + password +"')";
    con.query(mysql, function(err,rows,fields){
        if (err){
            console.log('Error during query processing');
        }
        else{
            res.send("You you in our system!")
        }
    }); 
});

//// adds new students into the student table in the database
//app.post('/add', function (req, res) {
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



