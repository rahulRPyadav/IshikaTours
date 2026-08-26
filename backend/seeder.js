const bcrypt = require('bcryptjs');
const User = require('./models/User'); // aapka user/admin model

app.get('/api/create-admin-once', async (req, res) => {
  const exists = await User.findOne({ email: 'ishika.travels4379@gmail.com' });
  if (exists) return res.send("Admin already exists!");
  
  const hashedPassword = await bcrypt.hash('Admin@1234', 10);
  await User.create({
    name: 'Admin',
    email: 'ishika.travels4379@gmail.com',
    password: hashedPassword,
    role: 'admin'
  });
  res.send("Admin created successfully! Email: ishika.travels4379@gmail.com, Pass: Admin@1234");
});