// server/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Public Routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin Routes 
router.post('/', protect, isAdmin, productController.createProduct);
router.put('/:id', protect, isAdmin, productController.updateProduct);
router.delete('/:id', protect, isAdmin, productController.deleteProduct);

module.exports = router;
