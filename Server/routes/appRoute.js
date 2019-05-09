var express = require('express');
var router = express.Router();


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

module.exports = router;