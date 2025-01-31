const db = require("../db/dbConfig");

exports.getRecentTransactions = (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const getUserQuery = "SELECT user_id FROM users WHERE user_email = ?";
  const getTransactionsQuery = `
      SELECT transaction_id, transaction_type, transaction_amount, transaction_datetime 
      FROM transactions 
      WHERE user_id = ? 
      ORDER BY transaction_datetime DESC 
      LIMIT 10;
    `;

  db.query(getUserQuery, [email], (err, userResults) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (userResults.length === 0)
      return res.status(404).json({ error: "User not found" });

    const userId = userResults[0].user_id;
    db.query(getTransactionsQuery, [userId], (err, transactionResults) => {
      if (err)
        return res.status(500).json({ error: "Failed to fetch transactions" });
      if (transactionResults.length === 0)
        return res.status(404).json({ error: "No transactions found" });

      res.json(transactionResults);
    });
  });
};
