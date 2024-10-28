const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Password Reset Confirmation
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    User.updatePassword(email, hashedPassword, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Password reset failed' });
      }
      res.status(200).json({ message: 'Password reset successful' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
