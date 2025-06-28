const authService = require('../services/authService');
const userEmitter = require('../events/userEvents');

exports.signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authService.signup(email, password);
        res.status(201).json({ message: 'User created successfully', userId: user.id });

        // Emit the 'userEmitter' event with the user and event type 'signup'
        userEmitter.emit('userEmitter', { eventType: 'signup', user });
    } catch (err) {
        // res.status(400).json({ error: err.message });
        next(err);  // sends error to centralized handler
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);
        res.json({ token, userId: user.id, email: user.email });

        // Emit the 'userEmitter' event with the user and event type 'login'
        userEmitter.emit('userEmitter', { eventType: 'login', user });
    } catch (err) {
        // res.status(401).json({ error: err.message });
        next(err);  // sends error to centralized handler
    }
};
