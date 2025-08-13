// controllers/cartController.js
const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;

// Utility: Calculate cart total
// Handles both populated and unpopulated cart items
const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => {
    // If populated → price from productId.price
    // If not populated → price from item.price (stored at add time)
    const price = item.productId?.price ?? item.price ?? 0;
    return total + price * (item.quantity ?? 1);
  }, 0);
};

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate inputs
    if (!isValidObjectId(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than zero' });
    }

    // Find user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get product details
    const product = await Product.findById(productId).select('name price imageUrl');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product already in cart
    const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      // Update quantity if already exists
      user.cart[itemIndex].quantity += quantity;
    } else {
      // Add new item with price stored
      user.cart.push({
        productId,
        quantity,
        price: product.price // Store price at time of adding
      });
    }

    await user.save();

    // Populate cart for response
    const populatedUser = await User.findById(req.user._id)
      .select('cart')
      .populate('cart.productId', 'name price imageUrl');

    const totalPrice = calculateCartTotal(populatedUser.cart);

    res.status(200).json({
      items: populatedUser.cart,
      totalPrice
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to add to cart', error: error.message });
  }
};

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('cart')
      .populate('cart.productId', 'name price imageUrl');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalPrice = calculateCartTotal(user.cart);

    res.status(200).json({
      items: user.cart,
      totalPrice
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to get cart', error: error.message });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter out the item
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();

    // Populate cart for response
    const populatedUser = await User.findById(req.user._id)
      .select('cart')
      .populate('cart.productId', 'name price imageUrl');

    const totalPrice = calculateCartTotal(populatedUser.cart);

    res.status(200).json({
      items: populatedUser.cart,
      totalPrice
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item from cart', error: error.message });
  }
};

// Update product quantity in cart
exports.updateCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than zero' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not in cart' });
    }

    user.cart[itemIndex].quantity = quantity;
    await user.save();

    // Populate cart for response
    const populatedUser = await User.findById(req.user._id)
      .select('cart')
      .populate('cart.productId', 'name price imageUrl');

    const totalPrice = calculateCartTotal(populatedUser.cart);

    res.status(200).json({
      items: populatedUser.cart,
      totalPrice
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to update quantity', error: error.message });
  }
};

/**
 * DELETE /api/cart
 * Clear the entire cart
 */
exports.clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = [];
    await user.save();

    return res.status(200).json({
      message: 'Cart cleared',
      items: [],
      totalPrice: 0,
    });
  } catch (error) {
    console.error('clearCart error:', error);
    return res.status(500).json({ message: 'Failed to clear cart', error: error.message });
  }
};