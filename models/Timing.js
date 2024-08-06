const mongoose = require('mongoose');

const TimingSchema = new mongoose.Schema({
    Opening_Time:String,
    Closing_Time: String,
});


module.exports = mongoose.model('Timings', TimingSchema);