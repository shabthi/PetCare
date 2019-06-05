const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    nic: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        // match:  
    },
    telephone: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema)