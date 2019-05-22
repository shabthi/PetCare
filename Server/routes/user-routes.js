const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

// Signup
router.post('/signup', userController.userSignup);

// Login
router.post('/login', userController.userLogin);

module.exports = router;