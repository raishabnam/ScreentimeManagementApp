const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Dashboard route (example: user profile)
router.get('/dashboard', verifyToken, (req, res) => {
  const getUserQuery = 'SELECT * FROM users WHERE id = ?';
  
  db.execute(getUserQuery, [req.user.id], (err, result) => {
    if (err || result.length === 0) return res.status(500).json({ error: 'User not found' });
    res.status(200).json({ user: result[0] });
  });
});

module.exports = router;
