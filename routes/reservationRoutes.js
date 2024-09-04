// rservation route

const express = require('express');
const {
  createReservation,
  getReservationsByHost,
  getReservationsByUser,
  deleteReservation,
} = require('../controllers/reservationController');
const auth = require('../middleware/auth');
const router = express.Router();

// Route to create a reservation
router.post('/', auth, createReservation);

// Route to get reservations by host
router.get('/host', auth, getReservationsByHost);

// Route to get reservations by user
router.get('/user', auth, getReservationsByUser);

// Route to delete a reservation
router.delete('/:id', deleteReservation);

module.exports = router;
