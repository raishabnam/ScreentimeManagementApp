const jwt = require('jsonwebtoken');
const User = require('../models/user');
git 
// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
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

// Dashboard Route (Example: Get User Profile)
exports.getDashboard = (req, res) => {
  User.findById(req.user.id, (err, result) => {
    if (err || result.length === 0) {
      return res.status(500).json({ error: 'User not found' });
    }
    res.status(200).json({ user: result[0] });
  });
};
