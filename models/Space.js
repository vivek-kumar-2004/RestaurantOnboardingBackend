const mongoose = require('mongoose');

const SpaceSchema = new mongoose.Schema({
    imageUrl: String,
    spaceTitle: String,
    userId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = mongoose.model('Space', SpaceSchema);
