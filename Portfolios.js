var express = require('express'); 
var request = require('request');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var mysql = require("mysql");
var request1 = require('sync-request');

var con = mysql.createConnection({   //provide creds for sql server 
    host: "localhost",
    user: "root",
    password: "p20h$K73FatL",
    database: "tracky",
});

con.connect(function(err) { //connect to sql server.. if fail log error else log connected. 
    if (err) {
        console.log("Error connecting to database" + err);
    }
    else {
    console.log("Database successfully connected");
    }
});

var app = express();  
app.use(express.static(".")); 
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8080, function(){    
    console.log('Server Started...')
});

//I hate quay

function getsearchterm(SearchURL,cb,data) {

    request({url: SearchURL, method:"get"}, function(err,res,body){
        if(cb) {
            cb(err, JSON.parse(body))
        }
        
    });
}

var counter = 0;
var apinum = 0;
app.get("/searchlist", function (req, resp){
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
    var searchterm = req.query.searchterm;
    var SearchURL = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+ searchterm + '&apikey=' + apikey[apinum];
    console.log(SearchURL)
    getsearchterm(SearchURL, function(err,data){
        console.log(counter);
        if (data.Note == 'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency. Thank you!'){
            console.log("Thanks");
            }
        resp.jsonp(data);
    });
});

app.get('/myaction', function (req, resp){
    var query = req.query;
    var Symbol = query.stock.split(':');
    var stockinfo = req.query.cost + ' ' + req.query.shares;
    console.log(Symbol[0].trim());
    Url1 = 'https://api.iextrading.com/1.0/stock/'+ Symbol[0].trim() + '/logo'
   
    request(Url1,function (error, response, body){
        var obj = JSON.parse(body);
        logo = obj.url;
        var sql = "Insert INTO portfolio(Company,Symbol,Shares, PurchasePrice,logo) VALUES ('"+Symbol[1]+ "','"+Symbol[0].trim()+ "','"+ query.shares+ "','" + query.cost + "','" +logo+"')";
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        var sql2 = "Insert INTO price(Symbol) VAlUES('"+Symbol[0].trim()+"')";
        con.query(sql2, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

    })
 
    resp.redirect('./homepage.html');

});
function getprice(){
    con.query('SELECT Symbol From portfolio', function(err,rows,fields){ 
        if (err)
            console.log('Error during query processing');
        else
            for (var i = 0; i < rows.length; i++) {
                var string=JSON.stringify(rows);
                var json = JSON.parse(string);

                stock = json[i].Symbol;
                console.log(stock);
                var URL2 = 'https://api.iextrading.com/1.0/stock/'+ stock +'/batch?types=quote'
                console.log(URL2);
                var res = request1('GET', URL2);
                var body = (res.getBody());
                var obj = JSON.parse(body)
                var price = obj.quote.latestPrice;
                var updateprice = "UPDATE price SET Price='" +price + "' Where Symbol='"+ stock + "'";
                con.query(updateprice, function (err, result) {
                    if (err) throw err;
                        console.log("1 record inserted");

})   
}})}


app.get ('/getprofile', function (req, resp){
    getprice();
    var sql = 'SELECT portfolio.id, portfolio.Company, portfolio.Symbol, portfolio.Shares, portfolio.PurchasePrice, portfolio.logo, price.Price From portfolio, price WHERE portfolio.Symbol = price.Symbol'
    con.query(sql, function(err,rows,fields){ 
    if (err)
        console.log('Error during query processing');
    else
        resp.jsonp(rows);

    });
});



