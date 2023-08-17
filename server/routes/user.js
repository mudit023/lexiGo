const express = require("express");
const { setLanguage, getDetails } = require("../controller/user");

const router = express.Router();

router.post("/setlan", setLanguage);
router.get("/", getDetails);

module.exports = router;
