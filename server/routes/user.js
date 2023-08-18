const express = require("express");
const { verifyUser, signup, updateLanguage } = require("../controller/user");

const router = express.Router();

router.get("/verify/:token", verifyUser);
router.post("/signup", signup);
router.get("/login/:token", verifyUser);
router.post("/updatelan", updateLanguage);
// router.get("/", getDetails);

module.exports = router;
