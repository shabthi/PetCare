//initialize mongo connection
require('./db').connectToServer(function(err, client){
    if (err) console.log(err);
})


var http = require('http');
var port =  8080;
var express = require('express');
var app = express();
var appRoutes = require('./routes/appRoute');
var userRoutes = require('./routes/user-routes');
var adminRoutes = require('./routes/admin-routes');
var statsRoutes = require('./routes/stats-routes');
var exportRoutes = require('./routes/export-routes');
var itemRoutes = require('./routes/item-routes');

var bodyParser = require('body-parser');
var cors = require('cors');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PetCare', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var nodemailer=require('nodemailer');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/',appRoutes);
app.use('/user', userRoutes);



//avoid CORS issues
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,PATCH,OPTIONS");
    next();
});

app.use('/admin', adminRoutes);
app.use('/stats', statsRoutes);
app.use('/export', exportRoutes);

app.use('/items', itemRoutes);

app.use('/', appRoutes);



http.createServer(app).listen(port);


console.log("running on port", port);
