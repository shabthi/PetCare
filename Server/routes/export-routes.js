const express = require('express');
const router = express.Router();
var db = require('../db').getDb();

router.get('/users', (req, res, next) => {
    const User = require('../models/user');
    User.find({}, function(err, users){
        if(err){
            res.status(500);
            res.json("error");
            return;
        }
        let results = [];
        users.forEach(function(user){
            let u = {
                _id:user.id,
                fullName:user.fullName,
                address:user.address,
                nic:user.nic,
                email:user.email,
                telephone:user.telephone
            }
            results.push(u);
        })
        res.status(200);
        res.json(results);
    })  
});

router.get('/pets', (req, res, next) => {
    var db = require('../db').getDb();
    db.collection('animals').find().toArray(function(err, pets){
        if(err){
            res.status(500);
            res.json("error");
            return;
        }
        console.log(pets);
        res.status(200);
        res.json(pets);
    })  
});



module.exports = router;