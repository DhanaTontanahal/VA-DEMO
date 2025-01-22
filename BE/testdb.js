const mysql = require("mysql2");

// Create a MySQL database connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root", // Replace with your DB username
  password: "yourpassword", // Replace with your DB password
  database: "menu_logger", // Replace with your DB name
  port: 3306,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database.");

  // Query to fetch the first 5 transactions
  const query = `
    SELECT transaction_id, user_id, transaction_type, transaction_amount, transaction_datetime
    FROM transactions
    LIMIT 5;
  `;

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      db.end();
      return;
    }

    // Print the results
    console.log("First 5 transactions:");
    results.forEach((row) => {
      console.log(
        `Transaction ID: ${row.transaction_id}, User ID: ${row.user_id}, Type: ${row.transaction_type}, Amount: $${row.transaction_amount}, Date: ${row.transaction_datetime}`
      );
    });

    // Close the database connection
    db.end((err) => {
      if (err) {
        console.error("Error closing the connection:", err.message);
      } else {
        console.log("Database connection closed.");
      }
    });
  });
});
