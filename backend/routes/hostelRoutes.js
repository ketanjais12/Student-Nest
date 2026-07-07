const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const Hostel = require('../models/Hostel');

const { 
  getHostels, 
  getHostelById, 
  createHostel, 
  updateHostel, 
  deleteHostel,
  getMyHostels 
} = require('../controllers/hostelController');

const { protect, authorize } = require('../middleware/authMiddleware');




router.get('/my-hostels', protect, authorize('owner'), getMyHostels);


router.route('/')
  .get(getHostels)
  .post(protect, authorize('owner'), upload.array('images', 5), createHostel);


router.route('/:id')
  .get(getHostelById)
  .put(protect, authorize("owner"), updateHostel)
  .delete(protect, authorize("owner"), deleteHostel);

 router.post('/hostels', upload.array('images', 5), async (req, res) => {
  try {
    // 2. Because you are uploading an array, Multer puts the files in req.files (not req.file)
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images were uploaded" });
    }

    // 3. Map through the uploaded files to get their live Cloudinary URLs
    const imageUrls = req.files.map(file => file.path);

    // 4. Pull the rest of the form data out of req.body
    const { 
      name, city, rent, gender, availableRooms, 
      description, address, roomType, foodIncluded, colleges, facilities 
    } = req.body;

    // 5. Build your database document
    const newHostel = new Hostel({
      name,
      city,
      rent,
      gender,
      availableRooms,
      description,
      address,
      roomType,
      foodIncluded,
      // Since frontend stringified the colleges array, parse it back to a real JS array
      colleges: colleges ? JSON.parse(colleges) : [], 
      facilities, 
      images: imageUrls // Save the array of live Cloudinary URLs into your MongoDB document
    });

    await newHostel.save();
    res.status(201).json({ message: "Hostel added successfully!", hostel: newHostel });

  } catch (error) {
    console.error("Backend Upload Error:", error);
    res.status(500).json({ message: "Server error while saving hostel listing" });
  }
});

module.exports = router;