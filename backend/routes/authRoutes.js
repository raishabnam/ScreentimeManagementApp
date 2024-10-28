const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // MySQL connection
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, fullname, email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userQuery = 'INSERT INTO users (username, fullname, email, password) VALUES (?, ?, ?, ?)';
    
    db.execute(userQuery, [username, fullname, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: 'User registration failed' });
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const findUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.execute(findUserQuery, [email], async (err, result) => {
    if (err || result.length === 0) return res.status(400).json({ error: 'User not found' });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, message: 'Login successful' });
  });
});

module.exports = router;
