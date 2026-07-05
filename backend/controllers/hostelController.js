const Hostel = require('../models/Hostel');

exports.getHostels = async (req, res) => {
  try {
    const { search, city, gender, minRent, maxRent } = req.query;
    let query = {};

    if (search) query.name = { $regex: search, $options: 'i' };
    if (city) query.city = { $regex: city, $options: 'i' };
    if (gender) query.gender = gender;
    if (minRent || maxRent) {
      query.rent = {};
      if (minRent) query.rent.$gte = Number(minRent);
      if (maxRent) query.rent.$lte = Number(maxRent);
    }

    const hostels = await Hostel.find(query).populate('owner', 'name email');
    res.json(hostels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id).populate('owner', 'name email');
    if (!hostel) return res.status(404).json({ message: 'Hostel not found' });
    res.json(hostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createHostel = async (req, res) => {
  try {
    // 1. Map through the files to get their paths
    const imageUrls = req.files ? req.files.map(file => file.path) : [];

    // 2. Extract body data
    let hostelData = { ...req.body };

    // --> NEW: Parse the stringified colleges array back into JSON <--
    if (hostelData.colleges && typeof hostelData.colleges === 'string') {
      try {
        hostelData.colleges = JSON.parse(hostelData.colleges);
      } catch (parseError) {
        console.error("Failed to parse colleges JSON:", parseError);
        hostelData.colleges = []; // Fallback to avoid crashing
      }
    }

    // 3. Create the hostel object with the image paths
    const newHostel = await Hostel.create({
      ...hostelData,
      images: imageUrls,
      owner: req.user._id
    });

    res.status(201).json(newHostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateHostel = async (req, res) => {
  try {
    let hostel = await Hostel.findById(req.params.id);
    if (!hostel) return res.status(404).json({ message: 'Hostel not found' });
    
    // Ensure the person updating is the owner
    if (hostel.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this hostel' });
    }

    let updateData = { ...req.body };

    // --> NEW: Also parse colleges here in case your frontend update logic uses FormData <--
    if (updateData.colleges && typeof updateData.colleges === 'string') {
      try {
        updateData.colleges = JSON.parse(updateData.colleges);
      } catch (parseError) {
        console.error("Failed to parse colleges JSON:", parseError);
      }
    }

    hostel = await Hostel.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(hostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) return res.status(404).json({ message: 'Hostel not found' });

    if (hostel.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this hostel' });
    }

    await hostel.deleteOne();
    res.json({ message: 'Hostel removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add this new function to your hostelController.js
exports.getMyHostels = async (req, res) => {
  try {
    // Find all hostels where the owner matches the logged-in user's ID
    const hostels = await Hostel.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(hostels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};