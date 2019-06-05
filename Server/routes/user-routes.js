const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');
const checkAuth = require('../middleware/check-auth');

// Signup
router.post('/signup', userController.userSignup);

// Login
router.post('/login', userController.userLogin);

// Get profile
router.get('/profile/:userId', checkAuth, userController.userProfile);

// Update
router.patch('/update/:userId', checkAuth, userController.userUpdate);

module.exports = router;