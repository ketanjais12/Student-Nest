const express = require('express');
const { getOwnerDashboard } = require('../controllers/ownerController');
const { protect, authorize } = require('../middleware/authMiddleware'); 

const router = express.Router();



router.get('/dashboard', protect, authorize('owner'), getOwnerDashboard);

module.exports = router;