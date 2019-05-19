var express = require('express');
var router = express.Router();
var Animal = require('../models/dataSchema');

var Admin = require('../models/admin');

router.post('/create', (req,  res,next) => {
    var newAnimal = new Animal({
        type: req.body.type,
        age: req.body.age,
        description: req.body.description,
        status: req.body.status,
        adopterId: req.body.adopterId
        
    });
    newAnimal.save((err,animal)=>{
        if(err)
            res.status(500).json({errmsg:err});
        res.status(200).json({msg:animal});
    })
   
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
    //res.status(200).json({msg:'Delete request workng'});
});


router.post('/admin/register', (req, res, next)=> {
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;

    Admin.create(email, name, password)
    .then(function(result){
        res.status(200);
        res.send(result);
    })
    .catch(function(error){
        res.status(500);
        res.send(error);
    });
});

module.exports = router;