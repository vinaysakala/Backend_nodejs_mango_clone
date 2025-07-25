const mongoose = require('mongoose');
const firmSchema = new mongoose.Schema({
    firmName: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String,
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
    region: {
        type: [
            {
                type: String,
                enum: ['South-indian', 'north-indian', 'chinese', 'bakery', 'fast-food', 'continental']
            }
        ]
    },
    offer: {
        type: String
    },
    image: {
        type: String
    },
    vender: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vender'
        }
    ],
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

const Firm = mongoose.model('Firm', firmSchema);
module.exports = Firm;  