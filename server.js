const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts'); // Import express-ejs-layouts

// Import Routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const expenseRoute = require('./routes/expenses');

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts as middleware
app.use(ejsLayouts); // This should be correctly placed here
app.set('layout', 'layout'); // Set the default layout

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });
  
// Routes
app.use('/', indexRoute);
app.use('/auth', authRoute);
app.use('/expenses', expenseRoute);

// Start Server
app.listen(3005, () => {
  console.log('Server running on http://localhost:3005');
});
