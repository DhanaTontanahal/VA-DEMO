const express = require("express");
const router = express.Router();
const { getAccountBalance } = require("../controllers/accountController");

router.get("/api/account-balance", getAccountBalance);

module.exports = router;
