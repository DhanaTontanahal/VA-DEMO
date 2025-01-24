const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "REPLACE_YOUR_HOST",
  user: "REPLACE_YOUR_USER",
  password: "REPLACE_YOUR_KEY",
  database: "REPLACE_YOUR_DB",
  port: REPLACE_YOUR_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = db;
