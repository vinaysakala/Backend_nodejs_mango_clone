const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: [
            {
                type: String,
                enum: ['Veg', 'non-veg']
            }
        ]
    },
    Image:{
        type: String
    },
    bestSeller: {
        type: String 
    },
    description:{
        type: String
    },
    firm:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm'
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;