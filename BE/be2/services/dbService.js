const db = require("../../config/dbConfig");

const getAccountBalanceByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT account_number, balance 
      FROM account_balance 
      WHERE user_id = (SELECT user_id FROM users WHERE user_email = ?);
    `;
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

module.exports = {
  getAccountBalanceByEmail,
};
