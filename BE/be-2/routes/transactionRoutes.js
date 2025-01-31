const express = require("express");
const router = express.Router();
const {
  getRecentTransactions,
} = require("../controllers/transactionController");

router.get("/api/recent-transactions", getRecentTransactions);

module.exports = router;
