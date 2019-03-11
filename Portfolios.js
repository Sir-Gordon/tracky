var express = require('express'); 
var request = require('request');
var mysql = require('mysql');
var bodyParser = require("body-parser");

var app = express();  
app.use(express.static(".")); 

app.listen(8080, function(){    
    console.log('Server Started...')
});

<<<<<<< HEAD
function getsearchterm(SearchURL,cb,data) {
=======

var apikey = '4914ER72DROICJLG'
var URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=' + apikey


request({url: URL}, function(err,res,body){
    
    // console.log(body);
>>>>>>> parent of f015fcc... almost

});

var msg = []
app.get("/searchlist", function (req, resp){
<<<<<<< HEAD
    apikey = ['4914ER72DROICJLG','Q4CFZAGYPRRD9GRI','XZTDJ07EAQK567OH','FGCCJ0BEM65D8K34','716QGRRMABZUDE87','WAI4B5EWWE6FLWQX','YCLTK7E9NR4THMFF','UL7XW4GHCHZI2LTZ','HH3TFTFAY00CP354','CQZGBZ02N3KH8XD3'];
    counter += 1;
    
    if (counter == 6){
        counter = 0;
        apinum += 1;
    if (apinum == 5){
        apinum = 0;
    }
    }
    
    console.log(apinum);
    console.log(apikey[apinum]);
=======
>>>>>>> parent of f015fcc... almost
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








