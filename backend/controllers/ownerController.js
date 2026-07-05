const Hostel = require('../models/Hostel');
const Booking = require('../models/Booking'); 

const getOwnerDashboard = async (req, res) => {
  try {
    const hostels = await Hostel.find({ owner: req.user._id });
    const hostelIds = hostels.map(hostel => hostel._id);

    const bookings = await Booking.find({ hostelId: { $in: hostelIds } })
      .populate('student', 'name email')
      .populate('hostelId', 'name rent')
      .sort({ createdAt: -1 }); 

    let activeTenants = 0;
    let pendingRequests = 0;
    let monthlyRevenue = 0;
    let totalCapacity = 0;

    hostels.forEach(hostel => {
      totalCapacity += (hostel.totalRooms || hostel.availableRooms || 10);
    });

    bookings.forEach(booking => {
      if (booking.status === 'pending') {
        pendingRequests++;
      } else if (booking.status === 'approved') {
        activeTenants++;
        const rentAmount = Number(booking.hostelId?.rent) || 0;
        monthlyRevenue += rentAmount;
      }
    });

    const occupancyRate = totalCapacity > 0 
      ? Math.min(Math.round((activeTenants / totalCapacity) * 100), 100) 
      : 0;

    const recentRequests = bookings.slice(0, 5);

    res.status(200).json({
      stats: {
        totalProperties: hostels.length,
        activeTenants,
        monthlyRevenue,
        pendingRequests,
        occupancyRate
      },
      recentRequests
    });

  } catch (error) {
    console.error("Error fetching owner dashboard:", error);
    res.status(500).json({ message: "Server error while loading dashboard" });
  }
};

module.exports = { getOwnerDashboard };