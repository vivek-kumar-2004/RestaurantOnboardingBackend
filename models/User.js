const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  restaurant_name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  opening_time: {
    type: String,
    required: function() { return this.status === 'Open'; },
  },
  closing_time: {
    type: String,
    required: function() { return this.status === 'Open'; },
  },
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Closed',
  },
  role: {
    type: String,
    enum: ['admin', 'restaurant_manager'],
    required: true,
    default: 'restaurant_manager'
  }
});

module.exports = mongoose.model('User', UserSchema);
