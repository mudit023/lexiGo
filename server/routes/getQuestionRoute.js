const express = require("express");
const { getQuestion } = require("../controller/qa");
const router = express.Router();

router.get("/:lan", getQuestion);

module.exports = router;
