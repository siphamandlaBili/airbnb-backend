 
const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', loginUser);

// Route to get the profile of the logged-in user
router.get('/profile', auth, getUserProfile);

module.exports = router;
