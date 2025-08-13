// server/controllers/orderController.js
const Order = require('../models/Order');
const User = require('../models/User');
const mongoose = require('mongoose');

// @desc    Place a new order (with products from request body)
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { products, totalAmount } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0)
      return res.status(400).json({ message: 'Order must contain products' });

    // Validate products array structure
    for (const item of products) {
      if (
        !item.productId ||
        !mongoose.Types.ObjectId.isValid(item.productId) ||
        !item.quantity ||
        item.quantity <= 0 ||
        typeof item.priceAtPurchase !== 'number' ||
        item.priceAtPurchase < 0
      ) {
        return res.status(400).json({ message: 'Invalid product data in order' });
      }
    }

    // Calculate total amount server-side to avoid manipulation (optional)
    const calculatedTotal = products.reduce(
      (sum, item) => sum + item.quantity * item.priceAtPurchase,
      0
    );

    if (totalAmount !== calculatedTotal) {
      return res.status(400).json({ message: 'Total amount mismatch' });
    }

    const order = new Order({
      userId,
      products,
      totalAmount: calculatedTotal,
      status: 'pending', // default status
    });

    const savedOrder = await order.save();

    // Update user's order history and clear cart
    await User.findByIdAndUpdate(userId, {
      $push: { orderHistory: savedOrder._id },
      $set: { cart: [] },
    });

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
};

// @desc    Place a new order directly from user's cart
exports.placeOrderFromCart = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch user and populate product details in cart
    const user = await User.findById(userId).populate('cart.productId');

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.cart || user.cart.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    let totalAmount = 0;
    const products = [];

    for (const item of user.cart) {
      if (!item.productId) continue; // skip deleted products

      const price = item.productId.price;
      const quantity = item.quantity;

      if (quantity <= 0) {
        return res.status(400).json({ message: 'Invalid quantity in cart' });
      }

      totalAmount += price * quantity;

      products.push({
        productId: item.productId._id,
        quantity,
        priceAtPurchase: price,
      });
    }

    if (products.length === 0) {
      return res.status(400).json({ message: 'No valid products in cart to order' });
    }

    const order = new Order({
      userId,
      products,
      totalAmount,
      status: 'pending',
    });

    const savedOrder = await order.save();

    // Clear user's cart and add order to history
    user.cart = [];
    user.orderHistory.push(savedOrder._id);
    await user.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order from cart', error: error.message });
  }
};

// @desc    Get logged-in user's orders with pagination and product details
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments({ userId });
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('products.productId', 'name price imageUrl')
      .lean();

    res.status(200).json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// @desc    Admin: Get all orders with pagination and user details
exports.getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments();
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email')
      .populate('products.productId', 'name price imageUrl')
      .lean();

    res.status(200).json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all orders', error: error.message });
  }
};

// @desc    Admin: Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const validStatuses = ['pending', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )
      .populate('userId', 'name email')
      .populate('products.productId', 'name price imageUrl');

    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
};
