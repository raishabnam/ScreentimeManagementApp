const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

// Password reset confirmation
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const resetPasswordQuery = 'UPDATE users SET password = ? WHERE email = ?';
  
  db.execute(resetPasswordQuery, [hashedPassword, email], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to reset password' });
    res.status(200).json({ message: 'Password reset successful' });
  });
});

module.exports = router;
