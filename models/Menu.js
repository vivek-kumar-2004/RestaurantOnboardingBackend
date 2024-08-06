const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    imageUrl:{
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
});


module.exports = mongoose.model('Menu', MenuSchema);