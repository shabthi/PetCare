var express = require('express');
var router = express.Router();

var Admin = require('../models/admin');

router.post('/create', (req,  res,next) => {
    res.status(200).json({msg:'Post request workng'});
});

router.get('/read',(req,res,next)=> {
    res.status(200).json({msg:'Get request workng'});
});

router.put('/update',(req,res,next)=> {
    res.status(200).json({msg:'Put request workng'});
});

router.delete('/delete/:id',(req,res,next)=> {
    res.status(200).json({msg:'Delete request workng'});
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