const express = require('express');
const app = express();
const router = express.Router();

let Item = require('../models/item');

router.route('/add').post(function (req, res) {
  let item = new Item(req.body);
  item.save()
    .then(game => {
    res.status(200).json({'item': 'Item added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

router.route('/').get(function (req, res) {
    Item.find(function (err, items){
    if(err){
      console.log(err);
    }
    else {
      res.json(items);
    }
  });
});


module.exports = router;

// var express = require('express');
// var router = express.Router();
// var Item = require('../models/item');


// router.post('/add', (req, res, next) => {
//     var newItem = new Item({
//         name: req.body.name,
//         code: req.body.code,
//         quantity: req.body.description,
//         description: req.body.description,
        
//     });
//     newItem.save((err,item)=>{
//         if(err)
//             res.status(500).json({errmsg:err});
//         res.status(200).json({msg:item});
//     })
   
// });
// module.exports = router;