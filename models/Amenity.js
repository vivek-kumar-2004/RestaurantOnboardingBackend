const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema({
    imageUrl: String,
    amenityTitle: String,
    userId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = mongoose.model('Amenity', AmenitySchema);
