const mongoose=require('mongoose');

const petPost=mongoose.Schema({
    petname:{type:String},
    adoptername:{type:String},
    imagePath:{type:String},
    description:{type:String},
    date:{type:String}
});

module.exports=mongoose.model('PetPost', petPost);