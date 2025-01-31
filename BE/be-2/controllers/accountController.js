const db = require("../db/dbConfig");

exports.getAccountBalance = (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const getUserQuery = "SELECT user_id FROM users WHERE user_email = ?";
  const getBalanceQuery =
    "SELECT account_number, balance FROM account_balance WHERE user_id = ?";

  db.query(getUserQuery, [email], (err, userResults) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (userResults.length === 0)
      return res.status(404).json({ error: "User not found" });

    const userId = userResults[0].user_id;
    db.query(getBalanceQuery, [userId], (err, balanceResults) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Failed to fetch account balance" });
      if (balanceResults.length === 0)
        return res.status(404).json({ error: "Account balance not found" });

      res.json({
        accountNumber: balanceResults[0].account_number,
        balance: balanceResults[0].balance,
      });
    });
  });
};
