const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // console.log("authHeader ::", authHeader);
    
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token malformed' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // userId and email
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
    }
};
