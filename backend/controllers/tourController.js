const Tour = require('../models/Tour');

// @desc Get All Tours
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get Single Tour by Slug OR ID
exports.getTourBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let tour = await Tour.findOne({ slug: slug });
    
    if (!tour && slug.match(/^[0-9a-fA-F]{24}$/)) {
      tour = await Tour.findById(slug);
    }

    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create New Tour Package
exports.createTour = async (req, res) => {
  try {
    const { title, location, duration, city, image, description, inclusions } = req.body;
    
    const slug = title.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "-");

    const newTour = await Tour.create({
      title,
      slug,
      location,
      duration,
      city: city || 'Jaipur',
      image,
      description,
      inclusions
    });

    res.status(201).json({ success: true, data: newTour });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete Tour
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Tour package deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};