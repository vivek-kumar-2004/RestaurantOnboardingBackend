const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    itemTitle: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    order: {
        type: Number,
        required: true,
        default: 0, 
    },
    userId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = mongoose.model('Menu', MenuSchema);
