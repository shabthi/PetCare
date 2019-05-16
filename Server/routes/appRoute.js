var express = require('express');
var router = express.Router();
var Animal = require('../models/dataSchema');

router.post('/create', (req,  res,next) => {
    var newAnimal = new Animal({
        type: req.body.type,
        age: req.body.age,
        description: req.body.description,
        
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
    animal.type=body.type;
    animal.age=body.age;
    animal.description=body.description;
    animal.save((err,animal)=>{
        if(err)
        res.status(500).json({errmsg:err});
    res.status(200).json({msg:animal});
    });
    })
});

router.delete('/delete/:id',(req,res,next)=> {
    res.status(200).json({msg:'Delete request workng'});
});

module.exports = router;