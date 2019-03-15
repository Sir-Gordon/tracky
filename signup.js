var express = require("express");
var app = express();
app.use(express.static("."));
var mysql = require('mysql');

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

// adds new students into the student table in the database
app.post('/Signup', function (req, res) {
    var name = req.query.n; //req.query contains the URL query parameters, which is the user's input (after the ? in the URL)
	var username = req.query.username;
	var pw = req.query.pw;
    var mysql = "INSERT INTO reg (name, username, password) VALUES ('" + name + "','" + username + "','" + pw + "')";
    con.query(mysql, function(err,rows,fields) {
	 	if (err){
	 		console.log('Error during query processing');
	 	}
	 	else {
	 		res.send("You've been added!");
	 	}
	 });
});


app.listen(8080, function () { //listens to the port 8080
    console.log("SERVER IS STARTING");
});



