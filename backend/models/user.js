const db = require('../config/db');

class User {
  static createUser(username, fullname, email, hashedPassword, callback) {
    const query = 'INSERT INTO users (username, fullname, email, password) VALUES (?, ?, ?, ?)';
    db.execute(query, [username, fullname, email, hashedPassword], (err, result) => {
      callback(err, result);
    });
  }

  static findByEmail(email, callback) {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.execute(query, [email], (err, result) => {
      callback(err, result);
    });
  }

  static findById(id, callback) {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.execute(query, [id], (err, result) => {
      callback(err, result);
    });
  }

  static updatePassword(email, hashedPassword, callback) {
    const query = 'UPDATE users SET password = ? WHERE email = ?';
    db.execute(query, [hashedPassword, email], (err, result) => {
      callback(err, result);
    });
  }
}

module.exports = User;
