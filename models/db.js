const mysql2 = require('mysql2');

const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sct212-0588',
  database: 'expense_tracker'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

module.exports = db;
