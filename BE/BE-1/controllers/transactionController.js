const db = require("../db/dbConfig");

exports.getLastFiveTransactions = (req, res) => {
  const userId = req.query.userId;
  const query = `SELECT transaction_type, transaction_amount, transaction_datetime FROM transactions 
                 WHERE user_id = ? ORDER BY transaction_datetime DESC LIMIT 5`;

  db.query(query, [userId], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Failed to fetch transactions" });
    res.json(results);
  });
};

exports.getTransactionsLastMonth = (req, res) => {
  const userId = req.query.userId;
  const query = `SELECT transaction_type, transaction_amount, transaction_datetime FROM transactions 
                 WHERE user_id = ? AND MONTH(transaction_datetime) = MONTH(CURDATE() - INTERVAL 1 MONTH)`;

  db.query(query, [userId], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Failed to fetch transactions" });
    res.json(results);
  });
};
