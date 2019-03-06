var express = require('express'); 
var request = require('request');
var mysql = require('mysql');


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

var itemtosend = [];
app.get("/searchlist", function (req, resp){
    var searchterm = req.query.searchterm;
    console.log(searchterm);
    
    URL = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+ searchterm + '&apikey=' + apikey;

    request({url: URL}, function(err,res,body){
        
        itemtosend.push(body);
        // console.log(body);
    });

    console.log(itemtosend);
    resp.jsonp(itemtosend);
});








