const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema({
    imageUrl:String,
    amenityTitle: String,
});


module.exports = mongoose.model('Amenity', AmenitySchema);