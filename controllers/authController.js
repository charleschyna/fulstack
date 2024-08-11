const bcrypt = require('bcryptjs');
const db = require('../models/db');

exports.register = (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    db.query('INSERT INTO Users (username, password) VALUES (?, ?)', [username, hash], (err, result) => {
      if (err) throw err;
      res.redirect('/auth/login');
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM Users WHERE username = ?', [username], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (isMatch) {
          req.session.user = results[0];
          res.redirect('/expenses/dashboard');
        } else {
          res.send('Invalid credentials');
        }
      });
    } else {
      res.send('User not found');
    }
  });
};
