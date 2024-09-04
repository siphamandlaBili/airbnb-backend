 // reservation.js model
const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  accommodation: { type: mongoose.Schema.Types.ObjectId, ref: 'Accommodation', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  guests: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  
}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);
