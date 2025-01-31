const express = require("express");
const router = express.Router();
const {
  getLastFiveTransactions,
  getTransactionsLastMonth,
} = require("../controllers/transactionController");

router.get("/transactions/last-five", getLastFiveTransactions);
router.get("/transactions/last-month", getTransactionsLastMonth);

module.exports = router;
