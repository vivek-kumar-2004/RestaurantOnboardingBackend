// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();

exports.register = async (req, res) => {
    try {
        const { name, email, password, restaurant_name, address, opening_time, closing_time, status, role } = req.body;

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
            restaurant_name,
            address,
            opening_time,
            closing_time,
            status,
            role // Adding the role to the user
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
            role: user.role // Adding role to the JWT payload
        };

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '2h',
                algorithm: 'HS256',
            });
            user = user.toObject();
            user.token = token;
            user.password = undefined;


            res.status(200).json({
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    restaurant_name: user.restaurant_name,
                    address: user.address,
                    opening_time: user.opening_time,
                    closing_time: user.closing_time,
                    status: user.status,
                    role: user.role
                },
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


exports.userdetails = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: 'User not authenticated' });
        }

        const user = await User.findById(req.user._id).select('-password');
        console.log(user)
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error('Error fetching user details:', err);
        res.status(500).send('Server Error');
    }
};


exports.updateUserDetails = async (req, res) => {
    try {
        const userId = req.user._id; 

        const {name, email, password, restaurant_name, address, opening_time, closing_time, status } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {name, email, password, restaurant_name, address, opening_time, closing_time, status },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Userdetails updated successfully',
            data: updatedUser
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await User.find({ role: 'restaurant_manager' });
        res.status(200).json(restaurants);
    } catch (err) {
        console.error('Error fetching restaurants:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};