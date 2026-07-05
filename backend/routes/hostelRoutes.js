const express = require('express');
const router = express.Router();

// --> FIX 1: Added getMyHostels to this import list <--
const { 
  getHostels, 
  getHostelById, 
  createHostel, 
  updateHostel, 
  deleteHostel,
  getMyHostels 
} = require('../controllers/hostelController');

const { protect, authorize } = require('../middleware/authMiddleware');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

// --> FIX 2: /my-hostels is safely placed BEFORE /:id <--
// I also added authorize('owner') here so only owners can access it
router.get('/my-hostels', protect, authorize('owner'), getMyHostels);

// Cleaned up route for GET all and POST create
router.route('/')
  .get(getHostels)
  .post(protect, authorize('owner'), upload.array('images', 5), createHostel);

// Routes requiring an ID
router.route('/:id')
  .get(getHostelById)
  .put(protect, authorize("owner"), updateHostel)
  .delete(protect, authorize("owner"), deleteHostel);

module.exports = router;