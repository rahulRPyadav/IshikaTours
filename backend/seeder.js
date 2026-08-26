const bcrypt = require('bcryptjs');
// User model import karein (jo bhi aapka path ho)
const User = require('./models/User'); 

// Temporary 1-Click Admin Creator Route
app.get('/api/create-admin-now', async (req, res) => {
  try {
    const adminEmail = 'ishika.travels4379@gmail.com';
    const adminPassword = 'Admin@1234';

    // Delete existing admin if any to avoid conflict
    await User.deleteOne({ email: adminEmail });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create New Admin
    const newAdmin = await User.create({
      name: 'Ishika Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });

    res.status(200).json({
      success: true,
      message: '✅ Admin created successfully!',
      email: adminEmail,
      password: adminPassword
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});