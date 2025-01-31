const db = require("../db/dbConfig");

exports.getUserProfile = (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM users WHERE user_id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "User not found" });

    res.json(results[0]);
  });
};
