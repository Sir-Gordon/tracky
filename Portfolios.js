var express = require('express'); 
var request = require('request');
var mysql = require('mysql');
var $ = require('jquery')

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


app.get("/searchlist", function (req, resp){
    var searchterm = req.query.searchterm;
    console.log(searchterm);

    URL = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+ searchterm + '&apikey=' + apikey;
    console.log(URL);

    request({url: URL}, function(err,res,body){
        console.log(body);
        
    })
    resp.jsonp(body);
});






