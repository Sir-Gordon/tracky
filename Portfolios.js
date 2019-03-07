var express = require('express'); 
var request = require('request');
var mysql = require('mysql');
var bodyParser = require("body-parser");

var app = express();  
app.use(express.static(".")); 

app.listen(8080, function(){    
    console.log('Server Started...')
});


var apikey = '4914ER72DROICJLG'
var URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=' + apikey


request({url: URL}, function(err,res,body){
    
    // console.log(body);

});

var msg = []
app.get("/searchlist", function (req, resp){
    var searchterm = req.query.searchterm;
    console.log(searchterm);
    
    URL = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+ searchterm + '&apikey=' + apikey;

    request({url: URL}, function(err,res,body){
        let json = JSON.parse(body)
        msg.push(json);
    });
    var msg1 = JSON.parse(msg[0]);
    console.log(msg1);
    resp.msg1;
    
});








