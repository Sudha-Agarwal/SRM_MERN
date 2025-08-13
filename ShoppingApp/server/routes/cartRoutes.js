// server/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/:productId', protect, updateCartQuantity);
router.delete('/:productId', protect, removeFromCart);
router.delete('/', protect, clearCart);

module.exports = router;
