const express = require('express');
const { getOwnerDashboard } = require('../controllers/ownerController');
const { protect, authorize } = require('../middleware/authMiddleware'); 

const router = express.Router();

// Route: GET /api/owner/dashboard
// Middleware: protect (must be logged in), authorize (must be an owner)
router.get('/dashboard', protect, authorize('owner'), getOwnerDashboard);

module.exports = router;