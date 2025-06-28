const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/sync', productController.syncProducts);
router.get('/all', authMiddleware.verifyToken, productController.getAllProducts);

module.exports = router;
