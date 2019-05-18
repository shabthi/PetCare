var express = require('express');
var router = express.Router();

var Admin = require('../models/admin');
var Stats = require('../models/stats');


router.post('/create', (req, res, next) => {
    res.status(200).json({ msg: 'Post request workng' });
});

router.get('/read', (req, res, next) => {
    res.status(200).json({ msg: 'Get request workng' });
});

router.put('/update', (req, res, next) => {
    res.status(200).json({ msg: 'Put request workng' });
});

router.delete('/delete/:id', (req, res, next) => {
    res.status(200).json({ msg: 'Delete request workng' });
});

router.post('/admin/register', (req, res, next) => {
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


module.exports = router;