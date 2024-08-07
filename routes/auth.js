const express = require('express');
const { register, login, userdetails } = require('../controllers/authController');
const auth = require('../middlewares/auth');

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', login);

router.get("/user", auth, userdetails)

module.exports = router;
