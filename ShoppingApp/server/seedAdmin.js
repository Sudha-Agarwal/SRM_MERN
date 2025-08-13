const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await User.create({
    name: 'Super Admin',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin'
  });

  console.log('Admin user created!');
  process.exit();
})();
