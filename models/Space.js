const mongoose = require('mongoose');

const SpaceSchema = new mongoose.Schema({
    imageUrl:String,
    spaceTitle: String,
});


module.exports = mongoose.model('Space',SpaceSchema);