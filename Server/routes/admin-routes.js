const express = require('express');
const router = express.Router();
var Admin = require('../models/admin');

router.post('/register', (req, res, next)=> {
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

router.post('/login', (req, res, next) => {
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