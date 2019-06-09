require('../index');
var express = require('express');
var router = express.Router();
var Animal = require('../models/dataSchema');
var User = require('../models/user');


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
                   User.find({},(err,users)=>{
                   
                   const mailOptions = {
                    from: 'AWPA', // sender address
                    to: users, // list of receivers
                    subject: 'New Pet has been added', // Subject line
                    text :  "Click here to view the pets. http://localhost:8080/petProfile "
                    // plain text body
                  };
                
                  transporter.sendMail(mailOptions, function (err, info) {
                    if(err)
                      console.log(err)
                    else
                      console.log(info);
                 });
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




module.exports = router;