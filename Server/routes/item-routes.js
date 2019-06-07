var express = require('express');
var router = express.Router();
var Item = require('../models/item');


router.post('/add', (req, res, next) => {
    var newItem = new Item({
        name: req.body.name,
        code: req.body.code,
        quantity: req.body.quantity,
        description: req.body.description,
        reorderLevel: req.body.reorderLevel        
        
    });
    newItem.save((err,item)=>{
        if(err)
            res.status(500).json({errmsg:err});
        res.status(200).json({msg:item});
    })
   
});

router.get('/',(req,res,next)=> {
  Item.find({},(err,items)=>{
  if(err)
      res.status(500).json(err);
  res.status(200).json(items);
  }); 
 
});

// router.route('/').get(function (req, res) {
//     Item.find(function (err, items){
//     if(err){
//       console.log(err);
//     }
//     else {
//       res.json(items);
//     }
//   });
// });
// router.put('/update',(req,res,next)=> {
//     Item.findById(req.body._id,(err,item)=>{
//         if(err)
//             res.status(500).json({errmsg:err});
//         item.name=req.body.name;
//         item.code=req.body.code;
//         item.quantity=req.body.quantity;
//         item.description =req.body.description;
//         item.reorderLevel=req.body.reorderLevel;
//         item.save((err,item)=>{
//         if(err)
//             res.status(500).json({errmsg:err});
//         res.status(200).json({msg:item});
//         });
//     })
// });
router.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Item.findById(id, function (err, item){
        res.json(item);
    });
  });
  
  //  Defined update route
  router.route('/update/:id').post(function (req, res) {
      Item.findById(req.params.id, function(err, item) {
      if (!item)
        return next(new Error('Could not load Document'));
      else {
          item.name=req.body.name;
          item.code=req.body.code;
          item.quantity=req.body.quantity;
          item.description =req.body.description;
          item.reorderLevel=req.body.reorderLevel;
          item.save().then(item => {
            res.json('Update complete');
        })
        .catch(err => {
              res.status(400).send("unable to update the database");
        });
      }
    });
  });
  
// router.delete('/delete/:id',(req,res,next)=> {
//     Item.findByIdAndRemove({_id:req.params.id},(err,item)=>{
//         if(err)
//             res.status(500).json({ errmsg: err});
//         res.status(200).json({msg:item});
//     });
    
// });
router.route('/delete/:id').get(function (req, res) {
    Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = router;