const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const ownerRoutes = require('./routes/ownerRoutes');


// Load env vars
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/hostels', require('./routes/hostelRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.use('/uploads', express.static('uploads'));
app.use('/api/owner', ownerRoutes);

// Add these lines near your other app.use statements
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));