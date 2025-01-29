const db = require("../../config/dbConfig");

const getLastFiveTransactions = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT transaction_type, transaction_amount, transaction_datetime
      FROM transactions
      WHERE user_id = ?
      ORDER BY transaction_datetime DESC
      LIMIT 5;
    `;
    db.query(query, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  getLastFiveTransactions,
};
