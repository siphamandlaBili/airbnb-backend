//  accommodationControllers
const Accommodation = require('../models/Accommodation');

exports.createAccommodation = async (req, res) => {
  try {
    const accommodation = new Accommodation(req.body);
    await accommodation.save();
    res.status(201).json(accommodation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find().populate('host');
    res.status(200).json(accommodations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAccommodationById = async (req, res) => {
  try {
    const { id } = req.params;
    const accommodation = await Accommodation.findById(id).populate('host');
    if (!accommodation) {
      return res.status(404).json({ error: 'Accommodation not found' });
    }
    res.status(200).json(accommodation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAccommodation = async (req, res) => {
  try {
    const { id } = req.params;
    const accommodation = await Accommodation.findByIdAndDelete(id);
    if (!accommodation) {
      return res.status(404).json({ error: 'Accommodation not found' });
    }
    res.status(200).json({ message: 'Accommodation deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
