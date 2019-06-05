const express = require('express');
const router = express.Router();
var Stats = require('../models/stats');


router.post('/adoptions-by-day', (req, res, next) => {
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

router.post('/requests-by-day', (req, res, next) => {
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

router.post('/pets-by-day', (req, res, next) => {
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

router.post('/users-by-day', (req, res, next) => {
    var start = req.body.start;
    var end = req.body.end;

    Stats.usersByDay(start, end)
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