const db = require('../models/db');

exports.addExpense = (req, res) => {
  const { amount, date, category } = req.body;
  const userId = req.session.user.id;

  db.query('INSERT INTO Expenses (user_id, amount, date, category) VALUES (?, ?, ?, ?)', [userId, amount, date, category], (err, result) => {
    if (err) throw err;
    res.redirect('/expenses');
  });
};

exports.viewExpenses = (req, res) => {
  const userId = req.session.user.id;

  db.query('SELECT * FROM Expenses WHERE user_id = ?', [userId], (err, results) => {
    if (err) throw err;
    res.render('expenses', { expenses: results });
  });
};
