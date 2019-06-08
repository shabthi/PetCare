const mongoose=require('mongoose');

const petPost=mongoose.Schema({
    name:{type:String},
    imagePath:{type:String},
    description:{type:String}
});

module.exports=mongoose.model('PetPost', petPost);