// accommodationRoutes.js

const express = require('express');
const {
    createAccommodation,
    getAllAccommodations,
    deleteAccommodation,
    getAccommodationById
} = require('../controllers/accommodationController');
const auth = require('../middleware/auth');
const Accommodation = require('../models/Accommodation');
const router = express.Router();

// Route to create an accommodation
router.post('/', auth, createAccommodation);

// Route to get all accommodations
router.get('/', getAllAccommodations);

// Route to get a specific accommodation by ID
router.get('/:id', getAccommodationById);

// Route to delete an accommodation by ID
router.delete('/:id', deleteAccommodation);

// Route to get all listings created by a specific user
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const { userId } = req.params;
        const userAccommodations = await Accommodation.find({ createdBy: userId });
        if (!userAccommodations || userAccommodations.length === 0) {
            return res.status(404).json({ message: 'No listings found for this user.' });
        }
        res.status(200).json(userAccommodations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
