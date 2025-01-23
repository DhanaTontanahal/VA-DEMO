const db = require("../../config/dbConfig");

const getRecentTransactionsByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT transaction_id, transaction_type, transaction_amount, transaction_datetime 
      FROM transactions 
      WHERE user_id = (SELECT user_id FROM users WHERE user_email = ?)
      ORDER BY transaction_datetime DESC 
      LIMIT 10;
    `;
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  getRecentTransactionsByEmail,
};
