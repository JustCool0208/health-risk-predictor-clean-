const express = require("express");

const router = express.Router();

const { getDashboardAnalytics } = require("../controllers/adminController");

router.get("/dashboard", getDashboardAnalytics);
module.exports = router;
