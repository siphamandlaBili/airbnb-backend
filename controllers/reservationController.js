 
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

// Get reservations by host
exports.getReservationsByHost = async (req, res) => {
  try {
    const host = req.user.id;
    const accommodations = await Accommodation.find({ host });
    const reservations = await Reservation.find({ accommodation: { $in: accommodations.map(acc => acc._id) } }).populate('user accommodation');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
