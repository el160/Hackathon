// routes/careerRoutes.js
const express = require("express");
const { fetchRecommendations } = require("../controllers/careerController");
const router = express.Router();

router.post("/recommend", fetchRecommendations);

module.exports = router;
