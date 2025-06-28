const productService = require('../services/productService');
const Product = require('../models/Product');

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