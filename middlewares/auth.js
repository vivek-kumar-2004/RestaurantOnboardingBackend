const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ msg: 'Invalid token, user not found' });
        }

        req.user = user; // Attach user data to request
        next();
    } catch (err) {
        console.error('Auth Middleware Error:', err);
        return res.status(401).json({ msg: 'Invalid token' });
    }
};

module.exports = auth;
