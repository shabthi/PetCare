var http = require ('http');
var port = process.env.PORT || 8080;
var express = require('express');
var app = express();
var appRoutes = require('./routes/appRoute');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pets', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/',appRoutes);

http.createServer(app).listen(port);


console.log("running on port",port);