const Booking = require('../models/Booking');
const Hostel = require('../models/Hostel');

const Razorpay = require('razorpay');
const crypto = require('crypto');


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



exports.createBookingRequest = async (req, res) => {
  try {
    const { hostelId, phoneNumber, duration, purpose } = req.body;
    const studentId = req.user.id; 

    
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    
    const existingBooking = await Booking.findOne({ 
      student: studentId, 
      hostel: hostelId,
      status: { $in: ['pending', 'accepted'] } 
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'You already have an active request for this hostel.' });
    }

    
    const booking = await Booking.create({
      student: studentId,
      hostel: hostelId,
      phoneNumber,
      duration,
      purpose,
      status: 'pending'
    });

    res.status(201).json({ message: 'Booking request sent successfully!', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



exports.getStudentBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ student: req.user.id })
      .populate({
        path: 'hostel',
        select: 'name city address rent owner',
        populate: { path: 'owner', select: 'name email phone' } 
      })
      .sort('-createdAt');

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



exports.getOwnerBookings = async (req, res) => {
  try {
    const ownerHostels = await Hostel.find({ owner: req.user.id }).select('_id');
    const hostelIds = ownerHostels.map(h => h._id);

    const bookings = await Booking.find({ hostel: { $in: hostelIds } })
      .populate('student', 'name email') 
      .populate('hostel', 'name city rent')
      .sort('-createdAt');

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body; 
    const bookingId = req.params.id;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status update' });
    }

    const booking = await Booking.findById(bookingId).populate('hostel');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.hostel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: `Booking ${status} successfully!`, booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



exports.createPaymentOrder = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('hostel');
    
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    if (booking.student.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    
    console.log("DEBUG 1 - Hostel Rent from DB:", booking.hostel.rent);

const amountInPaise = Math.round(booking.hostel.rent * 100);    
    
    console.log("DEBUG 2 - Amount in Paise:", amountInPaise);

 
const options = {
  amount: amountInPaise,
  currency: "INR",
  
  receipt: `rb_${booking._id.toString().slice(-20)}`, 
};

    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    
    console.error("DEBUG 3 - FULL RAZORPAY ERROR:", error);
    
    res.status(500).json({ 
      message: 'Razorpay order generation crash', 
      error: error.error || error.message || error 
    });
  }
};



exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const bookingId = req.params.id;

    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      const booking = await Booking.findById(bookingId);
      
      booking.status = 'paid';
      await booking.save();

      
      await Hostel.findByIdAndUpdate(booking.hostel, { $inc: { availableRooms: -1 } });

      res.status(200).json({ success: true, message: "Payment verified, data unlocked!" });
    } else {
      res.status(400).json({ success: false, message: "Tampering or invalid digital credentials signature." });
    }
  } catch (error) {
    res.status(500).json({ message: 'Cryptographic validation crash', error: error.message });
  }
};