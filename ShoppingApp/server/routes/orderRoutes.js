// server/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  placeOrder,
  placeOrderFromCart,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Place a new order (user only) - from request body
router.post('/', protect, placeOrder);

// Place a new order from cart (user only)
router.post('/from-cart', protect, placeOrderFromCart);

// Get logged-in user’s orders (with pagination)
router.get('/history', protect, getUserOrders);

// Admin: get all orders (with pagination)
router.get('/', protect, isAdmin, getAllOrders);

// Admin: update order status
router.put('/:id/status', protect, isAdmin, updateOrderStatus);

module.exports = router;
