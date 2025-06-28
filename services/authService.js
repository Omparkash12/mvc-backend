// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/users');
// const AppError = require('../utils/AppError');
// const ERRORS = require('../utils/errorMessages');
// require('dotenv').config();

// const SALT_ROUNDS = 10;

// exports.signup = async (email, password) => {
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//         // throw new Error('User already exists');
//         throw new AppError(ERRORS.USER_ALREADY_EXISTS, 400);
//     }

//     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

//     const user = await User.create({
//         email,
//         password: hashedPassword,
//     });

//     return user;
// };

// exports.login = async (email, password) => {
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//         // throw new Error('Invalid credentials');
//         throw new AppError(ERRORS.INVALID_CREDENTIALS, 401);
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         // throw new Error('Invalid credentials');
//         throw new AppError(ERRORS.INVALID_CREDENTIALS, 401);
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
//         expiresIn: '6h',
//     });

//     return { user, token };
// };
















// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/users');
// const File = require('../models/files');
// const AppError = require('../utils/AppError');
// const ERRORS = require('../utils/errorMessages');
// require('dotenv').config();

// const SALT_ROUNDS = 10;

// exports.signup = async (email, password) => {
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//         // throw new Error('User already exists');
//         throw new AppError(ERRORS.USER_ALREADY_EXISTS, 400);
//     }

//     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

//     const user = await User.create({
//         email,
//         password: hashedPassword,
//     });

//     return user;
// };

// exports.login = async (email, password) => {
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//         // throw new Error('Invalid credentials');
//         throw new AppError(ERRORS.INVALID_CREDENTIALS, 401);
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         // throw new Error('Invalid credentials');
//         throw new AppError(ERRORS.INVALID_CREDENTIALS, 401);
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
//         expiresIn: '1h', // Set token expiration time to 1 hour
//     });

//     // Fetch the user along with their files
//     const userWithFiles = await User.findByPk(user.id, {
//         include: File, // Include the associated files
//     });

//     // Send the response with user, token, and user's files
//     return {
//         user,
//         token,
//         files: userWithFiles.Files, // Send the files associated with the user
//     };
// };












const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const File = require('../models/files'); // Ensure File model is imported
const AppError = require('../utils/AppError');
const ERRORS = require('../utils/errorMessages');
require('dotenv').config();

const SALT_ROUNDS = 10;

exports.signup = async (email, password) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
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
        throw new AppError(ERRORS.INVALID_CREDENTIALS, 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError(ERRORS.INVALID_CREDENTIALS, 401);
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Set token expiration time to 1 hour
    });

    // Fetch the user along with their files (correct include syntax)
    const userWithFiles = await User.findOne({ where: { id: user.id } }, {
        include: {
            model: File, // Include the File model to fetch the associated files
            as: 'Files', // Alias for the included files
        },
    });

    console.log("userWithFiles ::", userWithFiles);
    
    // Return the response with user, token, and the files associated with the user
    return {
        user,
        token,
        files: userWithFiles, // Access the files associated with the user
    };
};

