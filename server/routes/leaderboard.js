const express = require("express");
const { getGlobalLeaderboard } = require("../controller/leaderboard");

const router = express.Router();

router.get("/", getGlobalLeaderboard);
// router.get("/", getDetails);

module.exports = router;
