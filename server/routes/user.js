const express = require("express");
const {
  verifyUser,
  signup,
  updateLanguage,
  resetProgress,
  getLeaderBoard,
} = require("../controller/user");

const router = express.Router();

router.get("/verify/:token", verifyUser);
router.post("/signup", signup);
router.get("/login/:token", verifyUser);
router.post("/updatelan", updateLanguage);
router.post("/reset", resetProgress);
router.post("/leaderboard", getLeaderBoard);
// router.get("/", getDetails);

module.exports = router;
