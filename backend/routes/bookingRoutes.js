const express = require('express');
const router = express.Router();
// ✅ NEW IMPORT
const {
  createBookingRequest,
  getStudentBookings,
  getOwnerBookings,
  updateBookingStatus,
  createPaymentOrder, // Added
  verifyPayment       // Added
} = require('../controllers/bookingController');

// Ensure you are importing your authentication middleware!
// Example: const { protect } = require('../middleware/authMiddleware');
const { protect } = require('../middleware/authMiddleware'); // Adjust path as needed

// Student routes
router.post('/', protect, createBookingRequest);
router.get('/student', protect, getStudentBookings);
router.post('/:id/create-order', protect, createPaymentOrder);
router.post('/:id/verify-payment', protect, verifyPayment);
// Owner routes
router.get('/owner', protect, getOwnerBookings);
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;