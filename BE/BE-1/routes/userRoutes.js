const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/userController");

router.get("/api/user-profile/:id", getUserProfile);

module.exports = router;
