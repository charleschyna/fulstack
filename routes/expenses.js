const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard');
});

router.get('/', isAuthenticated, expenseController.viewExpenses);
router.post('/add', isAuthenticated, expenseController.addExpense);

module.exports = router;
