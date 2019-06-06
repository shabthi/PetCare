const express = require('express');
const router = express.Router();
const multer = require('multer');

const userController = require('../controllers/user-controller');
const checkAuth = require('../middleware/check-auth');

// Profile picture upload configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/profile-pictures');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }else {
        cb(null, false);
    }
};

const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}); 

// Signup
// router.post('/signup', upload.single('profilePicture'), userController.userSignup);
router.post('/signup', userController.userSignup);

// Login
router.post('/login', userController.userLogin);

// Get profile
router.get('/profile', checkAuth, userController.userProfile);

// Update
router.patch('/update', checkAuth, userController.userUpdate);

// Update profile picture
router.patch('/update-profile-picture', upload.single('profilePicture'), checkAuth, userController.updateProfilePicture);

module.exports = router;