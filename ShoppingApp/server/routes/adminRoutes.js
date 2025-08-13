// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Example admin-only route: get all users
const User = require('../models/User');

router.get('/users', protect, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password').lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

// You can add more admin routes here, e.g., managing products, orders, etc.

module.exports = router;
