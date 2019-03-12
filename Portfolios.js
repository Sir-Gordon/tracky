var express = require('express'); 
var request = require('request');
var mysql = require('mysql');


var app = express();  
app.use(express.static(".")); 

var apikey = '4914ER72DROICJLG'
var URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=' + apikey


request({url: URL}, function(err,res,body){
    
    // console.log(body);

});


app.get("/searchlist", function (req, resp){
    var searchterm = req.query.searchterm;
    var apikey = '4914ER72DROICJLG'
    console.log(searchterm);
    URL = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+ searchterm + '&apikey=' + apikey;
    response = ''
    console.log(URL);

    request({url: URL}, function(err,res,body){
        console.log(body);
        
    })
    resp.jsonp(body);
});

app.listen(8080, function(){    
    console.log('Server Started...')
});

