const mongoose = require('mongoose');


const vendreSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
     firm:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
     ] 
})

const Vender = mongoose.model('Vender', vendreSchema);

module.exports = Vender