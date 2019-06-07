require('../index');
var express = require('express');
var router = express.Router();
var Animal = require('../models/dataSchema');

var Admin = require('../models/admin');
var Stats = require('../models/stats');

var nodemailer=require('nodemailer');
var formidable = require('formidable');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

router.post('/create', (req,  res,next) => {

     var form = new formidable.IncomingForm();
     form.uploadDir='../src/assets/Images_upload';
    
      form.parse(req, function (err, fields, files) {
        if (err){
            res.json({
                results: "failed",
                data:[],
                message: err
                });
            }
            
                 var oldpath = files["image"].path;
                var newpath = '../src/assets/Images_upload/' + files["image"].name;
                fs.rename(oldpath, newpath, function (err) {
                  if (err) throw err;
                  
                  });
               
                 var newAnimal = new Animal({
                    type: fields.type,
                    age: fields.age,
                    description: fields.description,
                    name: fields.name,
                    ownerEmail: fields.ownerEmail,
                    status: "For Adoption",
                    adopterId: "",
                    image: "assets/Images_upload/"+ files["image"].name
                }); 
                newAnimal.save((err,animal)=>{
                    if(err)
                        res.status(500).json({errmsg:err});
                    res.status(200).json({msg:animal});
                });  
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                           user: 'shabthij@gmail.com',
                           pass: 'ypurwnhhsnzliphv'
                       }
                   });
                   const mailOptions = {
                    from: 'AWPA', // sender address
                    to: 'shabthij@gmail.com', // list of receivers
                    subject: 'New Pet has been added', // Subject line
                    html : '<h5 >{{newAnimal.name}}</h5><ul><li>{{newAnimal.type}}</li> <li>{{newAnimal.age}}</li><li>{{newAnimal.status}}</li></ul><p>{{pet.description}}</p>'
                    // plain text body
                  };
                
                  transporter.sendMail(mailOptions, function (err, info) {
                    if(err)
                      console.log(err)
                    else
                      console.log(info);
                 });
            
        });
            
       
   
        // windows app password ypurwnhhsnzliphv
    

  
    
    
 
});


router.get('/read',(req,res,next)=> {
    
    Animal.find({},(err,animals)=>{
    if(err)
        res.status(500).json({errmsg:err});
    res.status(200).json({msg:animals});
}); 
   
    
});

router.put('/update',(req,res,next)=> {
    Animal.findById(req.body._id,(err,animal)=>{
        if(err)
            res.status(500).json({errmsg:err});
    animal.type=req.body.type;
    animal.age=req.body.age;
    animal.description=req.body.description;
    animal.status=req.body.status;
    animal.adopterId=req.body.adopterId;
    animal.save((err,animal)=>{
        if(err)
        res.status(500).json({errmsg:err});
    res.status(200).json({msg:animal});
    });
    })
});

router.delete('/delete/:id',(req,res,next)=> {
    Animal.findByIdAndRemove({_id:req.params.id},(err,animal)=>{
        if(err)
            res.status(500).json({ errmsg: err});
        res.status(200).json({msg:animal});
    });
    
});


router.post('/admin/register', (req, res, next)=> {
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;

    Admin.create(email, name, password)
        .then(function (result) {
            res.status(200);
            res.json(result);
        })
        .catch(function (error) {
            res.status(500);
            res.json(error);
        });
});

router.post('/admin/login', (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    Admin.login(email, password)
        .then(function (result) {
            res.status(200);
            res.json(result);
        })
        .catch(function (error) {
            res.status(500);
            res.json(error);
        });
});

router.post('/stats/adoptions-by-day', (req, res, next) => {
    var start = req.body.start;
    var end = req.body.end;

    Stats.adoptionsByDay(start, end)
        .then(function (result) {
            res.status(200);
            res.json(result);
        })
        .catch(function (error) {
            res.status(500);
            res.json(error);
        });
});

router.post('/stats/requests-by-day', (req, res, next) => {
    var start = req.body.start;
    var end = req.body.end;

    Stats.requestsByDay(start, end)
        .then(function (result) {
            res.status(200);
            res.json(result);
        })
        .catch(function (error) {
            res.status(500);
            res.json(error);
        });
});

router.post('/stats/pets-by-day', (req, res, next) => {
    var start = req.body.start;
    var end = req.body.end;

    Stats.petsByDay(start, end)
        .then(function (result) {
            res.status(200);
            res.json(result);
        })
        .catch(function (error) {
            res.status(500);
            res.json(error);
        });
});

module.exports = router;