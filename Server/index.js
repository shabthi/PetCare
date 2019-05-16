//initialize mongo connection
require('./db').connectToServer(function(err, client){
    if (err) console.log(err);
})


var http = require('http');
var port = process.env.PORT || 8080;
var express = require('express');
var app = express();
var appRoutes = require('./routes/appRoute');



//avoid CORS issues
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//JSON application
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use('/', appRoutes);

http.createServer(app).listen(port);


console.log("running on port", port);
