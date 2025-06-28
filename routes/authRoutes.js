const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const middleware = require("../middlewares/authMiddleware")

router.post('/signup', authController.signup);
router.post('/login', authController.login);
// router.post('/abc', authController.login);

module.exports = router;
