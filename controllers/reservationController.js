//reservationController

const Reservation = require('../models/Reservation');
const Accommodation = require('../models/Accommodation');

// Create a new reservation
exports.createReservation = async (req, res) => {
  try {
    const { accommodation, checkInDate, checkOutDate, guests, totalPrice } = req.body;
    const user = req.user.id;

    // Check if the accommodation exists
    const accommodationExists = await Accommodation.findById(accommodation);
    if (!accommodationExists) {
      return res.status(404).json({ error: 'Accommodation not found' });
    }

    const reservation = new Reservation({
      accommodation,
      user,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// reservationController.js

exports.getReservationsByHost = async (req, res) => {
  try {
    const hostId = req.user.id; // Get host ID from auth middleware
    if (!hostId) {
      return res.status(401).json({ error: 'Host not authenticated' });
    }

    // Find all accommodations listed by this host
    const accommodations = await Accommodation.find({ createdBy: hostId });

    if (!accommodations || accommodations.length === 0) {
      return res.status(404).json({ message: 'No accommodations found for this host.' });
    }

    // Get all accommodation IDs listed by the host
    const accommodationIds = accommodations.map(acc => acc._id);

    // Find all reservations made to these accommodations
    const reservations = await Reservation.find({ accommodation: { $in: accommodationIds } })
      .populate('accommodation'); // Ensure that the `accommodation` field is populated

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found for these accommodations.' });
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations by host:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};




// Get reservations by user
exports.getReservationsByUser = async (req, res) => {
  try {
    const user = req.user.id;
    const reservations = await Reservation.find({ user }).populate('accommodation');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
