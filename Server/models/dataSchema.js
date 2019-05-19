var mongoose = require('mongoose');

var animalSchema = mongoose.Schema({
    type:{type: String},
    age:{type: Number},
    description:{type: String},
    status:{type: String},
    adopterId:{type:String}
    
});

module.exports = mongoose.model('animal',animalSchema);