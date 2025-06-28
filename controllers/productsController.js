const productService = require('../services/productsService');
const Product = require('../models/products');

exports.syncProducts = async (req, res, next) => {
    try {
        const result = await productService.fetchAndSaveProducts();
        res.json(result);
    } catch (err) {
        next(err);
    }
};


exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        next(err);
    }
};