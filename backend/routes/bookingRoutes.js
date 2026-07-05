const express = require('express');
const router = express.Router();

const {
  createBookingRequest,
  getStudentBookings,
  getOwnerBookings,
  updateBookingStatus,
  createPaymentOrder, 
  verifyPayment       
} = require('../controllers/bookingController');



const { protect } = require('../middleware/authMiddleware'); 


router.post('/', protect, createBookingRequest);
router.get('/student', protect, getStudentBookings);
router.post('/:id/create-order', protect, createPaymentOrder);
router.post('/:id/verify-payment', protect, verifyPayment);

router.get('/owner', protect, getOwnerBookings);
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;