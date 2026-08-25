const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'admin' 
  }
}, { timestamps: true });

// Avoid model overwrite and ensure pure Mongoose Model export
module.exports = mongoose.models.User || mongoose.model('User', userSchema);