require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// User Model
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', UserSchema);

// Middleware: JWT Verification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({ email: req.body.email, password: hashedPassword });
    res.status(201).send("User registered");
  } catch (err) {
    res.status(400).send("Email already exists");
  }
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User not found");

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) return res.status(401).send("Invalid password");

  const token = jwt.sign({ id: user._id,
      email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: "Secure data", userId: req.user.id });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));