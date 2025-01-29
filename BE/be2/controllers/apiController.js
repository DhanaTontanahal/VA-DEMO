const transactionService = require("../services/transactionService");
const dbService = require("../services/dbService");
const menuUtils = require("../utils/menuUtils");

const getAccountBalance = async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const accountDetails = await dbService.getAccountBalanceByEmail(email);
    if (!accountDetails) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.json(accountDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch account balance" });
  }
};

const getRecentTransactions = async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const transactions = await transactionService.getRecentTransactionsByEmail(
      email
    );
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

const handleWebhook = async (req, res) => {
  // Handle webhook intents here...
};

module.exports = {
  getAccountBalance,
  getRecentTransactions,
  handleWebhook,
};
