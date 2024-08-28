 
const express = require('express');
const {
  createAccommodation,
  getAllAccommodations,
  deleteAccommodation,
  getAccommodationById
} = require('../controllers/accommodationController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createAccommodation);
router.get('/', getAllAccommodations);
router.get("/:id", getAccommodationById);  // New Route
router.delete('/:id', auth, deleteAccommodation);

module.exports = router; 
