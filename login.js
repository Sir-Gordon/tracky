var express = require("express");
var app = express();
app.use(express.static("."));
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data


// Connect to MYSQL
var con = mysql.createConnection({ //sets up mysql database
    host: 'localhost',
    user: 'root',
    password: 'Drexeldragons2022',
    database: 'reg',
});

// Checks for connection
con.connect(function (err) {
    if (err) {
        console.log('Error connecting to database'+err);
    } else {
        console.log('Database successfully connected');
    }
});

// urlencodedParser will pass the user's data, which can then be accessed by the req
app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var mysql="SELECT username,password FROM users WHERE username='"+username+"' AND password = '"+password+"'";
    con.query(mysql, function(err,rows,fields) {
        if (err){
            console.log('Error during query processing' + err);
        }
        else {
            res.send("You are logged in!")
        }
    });
})

app.listen(8080, function () { //listens to the port 8080
    console.log("SERVER IS STARTING");
});



