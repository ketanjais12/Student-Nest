const Booking = require('../models/Booking');
const Hostel = require('../models/Hostel');
// 1. New imports needed for production-grade payment cryptographic verification
const Razorpay = require('razorpay');
const crypto = require('crypto');

// 2. Initialize the backend Razorpay instance (Ensure these are defined in your .env)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Student requests a booking
// @route   POST /api/bookings
exports.createBookingRequest = async (req, res) => {
  try {
    const { hostelId, phoneNumber, duration, purpose } = req.body;
    const studentId = req.user.id; 

    // 1. Verify the hostel exists
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    // 2. Prevent duplicate pending requests for the same hostel
    const existingBooking = await Booking.findOne({ 
      student: studentId, 
      hostel: hostelId,
      status: { $in: ['pending', 'accepted'] } 
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'You already have an active request for this hostel.' });
    }

    // 3. Create the booking request
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

// @desc    Get all bookings for a logged-in student
// @route   GET /api/bookings/student
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

// @desc    Get all booking requests for a logged-in owner's properties
// @route   GET /api/bookings/owner
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

// @desc    Owner updates booking status (accept or reject)
// @route   PUT /api/bookings/:id/status
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

// @desc    Step 1: Create a secure Razorpay Order based on target hostel rent
// @route   POST /api/bookings/:id/create-order
exports.createPaymentOrder = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('hostel');
    
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    if (booking.student.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // --- DEBUG LOG 1: Check the rent value ---
    console.log("DEBUG 1 - Hostel Rent from DB:", booking.hostel.rent);

const amountInPaise = Math.round(booking.hostel.rent * 100);    
    // --- DEBUG LOG 2: Check the final math ---
    console.log("DEBUG 2 - Amount in Paise:", amountInPaise);

 // Change this section inside createPaymentOrder:
const options = {
  amount: amountInPaise,
  currency: "INR",
  // Use a shorter prefix and slice the ID to 20 characters
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
    // --- DEBUG LOG 3: Print the FULL Razorpay error to the terminal ---
    console.error("DEBUG 3 - FULL RAZORPAY ERROR:", error);
    
    res.status(500).json({ 
      message: 'Razorpay order generation crash', 
      error: error.error || error.message || error 
    });
  }
};

// @desc    Step 2: Cryptographically verify webhook response signatures from Razorpay gateway API
// @route   POST /api/bookings/:id/verify-payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const bookingId = req.params.id;

    // Concat order string block mapping variables
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    // Build validation digest matches securely using local secret constants
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      const booking = await Booking.findById(bookingId);
      
      booking.status = 'paid';
      await booking.save();

      // Decrement the physical unit spaces count safety configuration parameter
      await Hostel.findByIdAndUpdate(booking.hostel, { $inc: { availableRooms: -1 } });

      res.status(200).json({ success: true, message: "Payment verified, data unlocked!" });
    } else {
      res.status(400).json({ success: false, message: "Tampering or invalid digital credentials signature." });
    }
  } catch (error) {
    res.status(500).json({ message: 'Cryptographic validation crash', error: error.message });
  }
};