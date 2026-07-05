const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hostel: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel", required: true },
  
  // New Fields for Student Details
  phoneNumber: { type: String, required: true },
  duration: { type: Number, required: true }, // e.g., Number of months
  purpose: { type: String, required: true }, // e.g., College Name or Job
  
  // Updated Status tracking
  status: { 
    type: String, 
    enum: ["pending", "accepted", "rejected", "paid"], 
    default: "pending" 
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);