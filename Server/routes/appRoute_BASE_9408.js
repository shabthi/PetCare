require('../index');
var express = require('express');
var router = express.Router();
var Animal = require('../models/dataSchema');


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
            
        });
            
       
   
    
   /* //send mail
    async function sendMail(){
    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "shabthij@gmail.com", // generated ethereal user
      pass: "4$green8d" // generated ethereal password
    }
  });
// send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Shabthi"', // sender address
    to: "shabthij@gmail.com", // list of receivers
    subject: "New Pet Added", // Subject line
    text: "Hello world?", // plain text body
    //html: "<b>Hello world?</b>" // html body
  });
console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); 
  main().catch(console.error);}
  */

   
    /*form.parse(req, function (err, fields, files) {
      var oldpath = files.image.path;
      var newpath = 'C:/Users/Shabthika/Desktop/3rd Year/Web/PetCare/Images' + files.image.name;
      newAnimal.image=newpath;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
}); */
 
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