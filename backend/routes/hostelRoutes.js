const express = require('express');
const router = express.Router();


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



router.get('/my-hostels', protect, authorize('owner'), getMyHostels);


router.route('/')
  .get(getHostels)
  .post(protect, authorize('owner'), upload.array('images', 5), createHostel);


router.route('/:id')
  .get(getHostelById)
  .put(protect, authorize("owner"), updateHostel)
  .delete(protect, authorize("owner"), deleteHostel);

module.exports = router;