// Base Varibles
const mysql = require('mysql2');

// Connect to database
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'payroll'
});

// Tells if the database is connected or not
conn.connect(function(err) {
    if(err) console.log(err);
    else console.log('Database is successfully connected!')
});

// Export connection
module.exports = conn