// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

const router = express.Router();

// REGISTER
router.post('/registration', async (req, res) => {
  const { firstName, lastName, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !password || !confirmPassword)
    return res.status(400).json({ error: 'All fields are required' });

  if (password !== confirmPassword)
    return res.status(400).json({ error: 'Passwords do not match' });

  const email = `${firstName}${lastName}`.toLowerCase() + '@gmail.com';
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`,
    [firstName, lastName, email, hashedPassword],
    function (err) {
      if (err) return res.status(400).json({ error: 'User already exists or invalid data' });
      res.json({ message: 'User registered successfully', email });
    }
  );
});

// LOGIN
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Server error' });

    if (!user) {
      return res.status(400).json({ error: 'Email not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  });
});

module.exports = router;
