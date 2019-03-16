var express = require("express");
var app = express();
app.use(express.static("."));
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.post('/Signup', function (req, res) {
    var name = req.body.name; 
	var username = req.body.username;
	var pw = req.body.pw;
    console.log(JSON.stringify(name));
    var mysql = "INSERT INTO users (name, username, password) VALUES ('" + name + "','" + username + "','" + pw + "')";
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



