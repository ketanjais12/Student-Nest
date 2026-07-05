const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: String,
  city: { type: String, required: true },
  address: String,
  rent: { type: Number, required: true },
  availableRooms: { type: Number, required: true },
  gender: { type: String, enum: ["boys", "girls", "unisex"], required: true },
  facilities: [String],
  images: [String],
 roomType: {
    type: String,
    enum: ['Single', 'Double', 'Triple', 'Dormitory', 'Multiple Options'],
    required: true
  },
  foodIncluded: {
    type: Boolean,
    default: false
  },
  colleges: [{
    name: { type: String, required: true },
    distance: { type: String, required: true } 
  }]
}, { timestamps: true });

module.exports = mongoose.model('Hostel', hostelSchema);