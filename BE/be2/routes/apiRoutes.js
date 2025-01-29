const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.get("/account-balance", apiController.getAccountBalance);
router.get("/recent-transactions", apiController.getRecentTransactions);
router.post("/", apiController.handleWebhook);

module.exports = router;
