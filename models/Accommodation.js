//Accomodation.js model

const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    beds: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    amenities: [String],
    host: {
        type: String,
        required: true, // Ensure this field is marked as required
    },
    description: {
        type: String,
        required:true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});



module.exports = mongoose.model('Accommodation', accommodationSchema);
