const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

// User Schema & Model define locally to avoid export mismatch
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

const resetAndCreateAdmin = async () => {
  try {
    // Wait for connection to establish properly
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ishika_travels');
    console.log(' Connected to MongoDB');

    // 1. Purana Admin account clean karein
    await User.deleteMany({ email: 'admin@ishikatravels.com' });
    console.log(' Purana Admin account reset kar diya gaya.');

    // 2. Fresh Password Hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // 3. Naya Admin Create karein
    await User.create({
      name: 'Ishika Admin',
      email: 'admin@ishikatravels.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log(' FRESH ADMIN ACCOUNT CREATED SUCCESSFULLY!');
    console.log('-------------------------------------------');
    console.log(' Email: admin@ishikatravels.com');
    console.log(' Password: admin123');
    console.log('-------------------------------------------');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(' Error creating admin:', error);
    process.exit(1);
  }
};

resetAndCreateAdmin();