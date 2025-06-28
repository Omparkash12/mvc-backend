const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AppError = require('../utils/AppError');
const ERRORS = require('../utils/errorMessages');
require('dotenv').config();

const SALT_ROUNDS = 10;

exports.signup = async (email, password) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        // throw new Error('User already exists');
        throw new AppError(ERRORS.USER_ALREADY_EXISTS, 400);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
        email,
        password: hashedPassword,
    });

    return user;
};

exports.login = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        // throw new Error('Invalid credentials');
        throw new AppError(ERRORS.INVALID_CREDENTIALS, 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        // throw new Error('Invalid credentials');
        throw new AppError(ERRORS.INVALID_CREDENTIALS, 401);
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return { user, token };
};
