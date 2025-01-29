const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// Define routes
router.get("/account-balance", apiController.getAccountBalance);
router.post("/webhook", apiController.handleWebhook);

// Export router
module.exports = router;
