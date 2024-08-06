const mongoose = require('mongoose');

// const MenuSchema = new mongoose.Schema({
//     imageUrl:String,
//     itemname: String,
//     price: Number,
// });

const AmenitySchema = new mongoose.Schema({
    name: String,
});

const SpaceSchema = new mongoose.Schema({
    name: String,
});

const BookingSchema = new mongoose.Schema({
    customerName: String,
    date: Date,
    time: String,
});


// module.exports = mongoose.model('Menu', MenuSchema);
module.exports = mongoose.model('Amenity', AmenitySchema);
module.exports = mongoose.model('Space',SpaceSchema);
module.exports = mongoose.model('Booking', BookingSchema);
