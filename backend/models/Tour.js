const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  city: { 
    type: String, 
    required: true, 
    enum: ['Jaipur', 'Sikar', 'Udaipur', 'Jodhpur', 'Pushkar', 'Other'],
    default: 'Jaipur' 
  },
  rating: { type: Number, default: 4.8 },
  image: { type: String, required: true },
  description: { type: String, required: true },
  inclusions: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Tour', tourSchema);