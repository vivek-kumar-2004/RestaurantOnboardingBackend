const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, restaurant_name, address } = req.body;

        // Ensure restaurant_name is not null or empty
        if (!restaurant_name || restaurant_name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Restaurant name is required',
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role,
            restaurant_name,
            address
        });

        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: newUser
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '2h',
                algorithm: 'HS256',
            });

            user=user.toObject();
            user.token=token;
            user.password=undefined;

            console.log(user);

            res.status(200).json({
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    restaurant_name: user.restaurant_name,
                    address: user.address
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Incorrect password',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};



