var http = require ('http');
var port = process.env.PORT || 8080;
var express = require('express');
var app = express();
var appRoutes = require('./routes/appRoute');

app.use('/',appRoutes);

http.createServer(app).listen(port);


console.log("running on port",port);
