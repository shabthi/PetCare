const express=require("express");
const multer=require('multer');
const PetPost=require('../models/petPost');
const router =express.Router();


const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
};
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid=MIME_TYPE_MAP[file.mimetype];
        console.log(isValid);
        let error=new Error("Invalid mime type");
        if(isValid){
            error=null;
        }
        cb(error,"Server/images")
    },
    filename:(req,file,cb)=>{
        const name=file.originalname.toLowerCase().split(' ').join('-');
        const ext=MIME_TYPE_MAP[file.mimetype];
        cb(null,name+'-'+Date.now()+'.'+ext);
    }
});


const multerConf={
    storage:multer.diskStorage({
        destination:function(req,file,next){
            next(null,'./Server/images');
        },
        filename:function(req,file,next){
            console.log(file);
        }
    }),
};
  

router.post('',multer({storage:storage}).single('imagePath'),(req,res,next)=>{
    const url=req.protocol+'://'+req.get("host");
   // console.log(storage.filename);
    console.log(url);
    console.log(req.file.filename);
    console.log(req.body.features);
    console.log(req.body.price);
    const petPost=new PetPost({
        name:req.body.name,
        imagePath:url+"/images/"+req.file.filename ,
        description:req.body.description
        
    });
    console.log(petPost.name);
    petPost.save().then(result=>{
        res.status(201).json({
            message:'PetPost added successfully',
            petpostId:result._id,
            imagePath:result.imagePath
        });
    });
   
});

router.delete("/:id",(req,res,next)=>{
    // console.log(req.params.id);
     PetPost.deleteOne({_id:req.params.id}).then(result=>{
         console.log(result);
         res.status(200).json({
             message:'PetPost deleted'
         });
     });
 });

router.put("/:id",multer({storage:storage}).single('imagePath'),(req,res,next)=>{
    let imagePath=req.body.imagePath;
    let petPost;
    if(req.file){
        const url=req.protocol+"://"+req.get("host");
        imagePath=url+"/images/"+req.file.filename;

        petPost=new PetPost({
            _id:req.body.id,
            name:req.body.name,
            imagePath:imagePath,
            description:req.body.description
        });
    }else{
        petPost=new PetPost({
            _id:req.body.id,
            name:req.body.name,
            imagePath:imagePath,
            description:req.body.description
        });
    }
   
    PetPost.updateOne({_id:req.params.id},petPost).then(result=>{
        res.status(200).json({message:"Update successful!",imagePath:petPost.imagePath});
    });
});
router.get("",(req,res,next)=>{
    PetPost.find().then(documents=>{
        res.status(200).json({
            message:"PetPosts fetched successfully",
            petposts:documents
        });
    });
   
});

module.exports=router;