const express = require("express");
const router = express.Router();
const {
  handleDialogflowWebhook,
} = require("../controllers/dialogflowController");

router.post("/", handleDialogflowWebhook);

module.exports = router;
